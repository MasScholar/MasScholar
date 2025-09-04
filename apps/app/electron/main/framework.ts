/* eslint-disable @typescript-eslint/no-explicit-any */
// main/framework.ts
import { ipcMain, IpcMainInvokeEvent } from "electron";
import "reflect-metadata"
import { ZodType } from "zod";

//============================ START OF SECTION ============================//
/**
 * design a lightweight IoC framework for Electron IPC
 *
 * How to use:
 * 1. Define a service with @Service decorator
 * 2. Define methods with @Action or @Event decorators
 * 3. Use @Inject to inject services into other services
 * 4. Use useMiddleware to add middleware for IPC handling
 *
 * Example:
 * @Service()
 * class MyService { // must end with 'Service'
 *   @Action('class_name.method_name', z.object({ foo: z.string() }))
 *   async doSomething(data: { foo: string }) {
 *    // handle action
 *   }
 * }
 *
 * in another service
 * @Service()
 * class AnotherService {
 *  constructor(@Inject('MyService') private myService: MyService) {}
 * }
 */
/** ===== IoC ===== */
const providers = new Map<string, any>();

/** ===== Middleware ===== */
type Middleware = (ctx: IpcContext, next: () => Promise<void>) => Promise<void>;
const middlewares: Middleware[] = [];

export function useMiddleware(mw: Middleware) {
  middlewares.push(mw);
}

async function runMiddlewares(ctx: IpcContext, handler: () => Promise<void>) {
  let index = -1;
  async function dispatch(i: number) {
    if (i <= index) throw new Error("next() called multiple times");
    index = i;
    const fn = i === middlewares.length ? handler : middlewares[i];
    if (fn) await fn(ctx, () => dispatch(i + 1));
  }
  await dispatch(0);
}

/** ===== IPC Context ===== */
export interface IpcContext {
  channel: string;
  args: any[];
  event: IpcMainInvokeEvent | null;
  result?: any;
}

/** ===== 元信息 ===== */
type EventMeta = { methodName: string; schema?: ZodType };
type ActionMeta = { methodName: string; schema?: ZodType };

const classActionMetadata = new Map<any, Record<string, ActionMeta>>();
const classEventMetadata = new Map<any, Record<string, EventMeta>>();

/** ===== Action 装饰器 ===== */
export function Action(channel: string, schema?: ZodType) {
  return function (target: any, key: any) {
    let meta = classActionMetadata.get(target.constructor);
    if (!meta) meta = {};
    meta[channel] = { methodName: key.name, schema };
    classActionMetadata.set(channel, meta);
  };
}

/** ===== Event Decorator ===== */
export function Event(channel: string, schema?: ZodType) {
  return function (target: any, key: any) {
    let meta = classEventMetadata.get(target.constructor);
    if (!meta) meta = {};
    meta[channel] = { methodName: key.name, schema };
    classEventMetadata.set(channel, meta);
  };
}

/** ===== Service Decorator ===== */
function getInstanceMethodNames(obj: any) {
  const proto = Object.getPrototypeOf(obj); // 获取原型
  return Object.getOwnPropertyNames(proto).filter(
    name => typeof proto[name] === "function" && name !== "constructor"
  );
}

export function Service(id?: string) {
  return function (TargetClass: any) {
    const key = id || TargetClass.name;
    const instance = new TargetClass();
    /** Register Action */
    for (const methodName of getInstanceMethodNames(instance)) {
      const actions = classActionMetadata.get(`${TargetClass.name}.${methodName}`) || {};
      for (const [channel, meta] of Object.entries(actions)) {
        const fn = instance[meta.methodName];
        if (typeof fn !== "function") continue;
        ipcMain.handle(channel, async (event, ...args) => {
          const ctx: IpcContext = { channel, args, event };
          await runMiddlewares(ctx, async () => {
            if (meta.schema) meta.schema.parse(args[0]);
            ctx.result = await fn.apply(instance, args);
          });
          return ctx.result;
        });
      }
    }

    /** Register Event */
    for (const methodName of getInstanceMethodNames(instance)) {
      const events = classEventMetadata.get(`${TargetClass.name}.${methodName}`) || {};
      for (const [channel, meta] of Object.entries(events)) {
        const fn = (instance as any)[meta.methodName];
        if (typeof fn !== "function") continue;

        if (!ipcMain.listenerCount(channel)) {
          ipcMain.on(channel, (event, data) => {
            if (meta.schema) meta.schema.parse(data);
            fn.call(instance, data);
          });
        }
      }
    }

    providers.set(key, instance);
  };
}

/** ===== Inject Decorator ===== */
export function Inject(id: string) {
  return function (target: any, _key: string, index: number) {
    const original = target;
    return {
      value: function (...args: any[]) {
        args.splice(index, 0, providers.get(id));
        return new original(...args);
      },
    };
  };
}

/** ===== Subscribe ===== */
type EventCallback<T = any> = (data: T) => void;
const subscriptions: Record<string, Set<EventCallback>> = {};

export function subscribe<T = any>(channel: string, cb: EventCallback<T>) {
  if (!subscriptions[channel]) subscriptions[channel] = new Set();
  subscriptions[channel].add(cb);
  return () => subscriptions[channel].delete(cb);
}

//============================ END OF SECTION ==============================//

//============================ START OF SECTION ============================//
/**
 * design a lightweight web framework for Electron protocol
 *
 * How to use:
 * 1. Define a controller with decorators
 * 2. Use @Controller to define the base path
 * 3. Use @Get, @Post, etc. to define routes
 * 4. Use @PathParam, @Param, @Query, @Body, @Header to extract request data
 *
 * Example:
 * @Controller('/api')
 * class MyController {
 *   @Get('/hello')
 *   async sayHello(ctx: Context) {
 *   ctx.res.json({ message: 'Hello, World!' });
 * }
 */
// Protocol Framework

export interface AppRequest {
  raw: Request;
  method: string;
  url: URL;
  headers: Record<string, string>;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
  json<T = any>(): Promise<T>;
  text(): Promise<string>;
  formData(): Promise<FormData>;
  arrayBuffer(): Promise<ArrayBuffer>;
}

export class AppResponse {
  private _status: number = 200;
  private _headers = new Headers();
  private _body: BodyInit | null = null;

  status(code: number) { this._status = code; return this; }
  header(name: string, val: string) { this._headers.set(name, val); return this; }
  json(data: any) { this._headers.set('Content-Type', 'application/json'); this._body = JSON.stringify(data); return this; }
  text(data: string) { this._headers.set('Content-Type', 'text/plain'); this._body = data; return this; }
  html(data: string) { this._headers.set('Content-Type', 'text/html'); this._body = data; return this; }
  bytes(buf: Uint8Array | ArrayBuffer) { this._body = buf as BodyInit; return this; }
  stream(body: ReadableStream) { this._body = body; return this; }
  finalize(): Response { return new Response(this._body, { status: this._status, headers: this._headers }); }
}

export interface Context {
  req: AppRequest;
  res: AppResponse;
  next: () => Promise<void>;
}

const META = {
  ctrlPrefix: Symbol('ctrl:prefix'),
  routes: Symbol('routes'),
  params: Symbol('params'),
  schema: Symbol('schema'),
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export function Controller(prefix: string = '') {
  return function (target: any) {
    if (prefix && !prefix.startsWith('/')) {
      prefix = '/' + prefix;
    }
    if (prefix.endsWith('/')) {
      prefix = prefix.slice(0, -1);
    }
    if (Reflect.hasMetadata(META.ctrlPrefix, target)) {
      throw new Error(`Duplicate @Controller definition on ${target.name}`);
    }
    Reflect.defineMetadata(META.ctrlPrefix, prefix, target);
  }
}

// Http Method Decorators
function methodDecoratorFactory(httpMethod: HttpMethod) {
  return function (path: string, schema?: ZodType) {
    return function (target: any, key: string) {
      console.log(`Registering route: [${httpMethod}] ${path} -> ${target.constructor.name}.${key}`);
      console.log('Schema:', schema); // Debug log
    }
  }
}

export const Get = methodDecoratorFactory('GET');
export const Post = methodDecoratorFactory('POST');
export const Put = methodDecoratorFactory('PUT');
export const Delete = methodDecoratorFactory('DELETE');
export const Options = methodDecoratorFactory('OPTIONS');

// Parameter Decorators
function paramDecoratorFactory(type: 'path_param' | 'param' | 'query' | 'body' | 'ctx', key?: string) {
  return function (target: any, propertyKey: string, index: number) {
    console.log(`Registering param: ${type} ${index} -> ${target.constructor.name}.${propertyKey} ${key}`);
  }
}

export const PathParam = (k: string) => paramDecoratorFactory('path_param', k);
export const Param = (k: string) => paramDecoratorFactory('param', k);
export const Query = (k: string) => paramDecoratorFactory('query', k);
export const Body = () => paramDecoratorFactory('body');
export const Ctx = () => paramDecoratorFactory('ctx');

// Validation Decorator
export function Validate(schema: ZodType) {
  return function (target: any, propertyKey: string) {
    console.log(`Registering validation schema for ${schema} on ${target.constructor.name}.${propertyKey}`);
  }
}

// bootstrap function to register protocol
export function bootstrapProtocol(scheme: string) {
  console.log(`Bootstrapping protocol: ${scheme}`);
}
//============================ END OF SECTION ==============================//

//============================ START OF SECTION ============================//
/**
 * Helper Scripts
 *
 * How to use:
 * 1. Call generateSDK() to generate SDK files
 */
export function generateDocs() {
  console.log('Generating docs...');
}

export function generateRenderProtocolSDK() {
  console.log('Generating SDK...');
}

export function generateRenderServiceSDK() {
  console.log('Generating service types...');
}
//============================ END OF SECTION ==============================//
