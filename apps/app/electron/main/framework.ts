/* eslint-disable @typescript-eslint/no-explicit-any */
// main/framework.ts
import { ipcMain, IpcMainInvokeEvent } from "electron";
import { ZodType } from "zod";

/** ===== IoC 容器 ===== */
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

/** ===== Event 装饰器 ===== */
export function Event(channel: string, schema?: ZodType) {
  return function (target: any, key: any) {
    let meta = classEventMetadata.get(target.constructor);
    if (!meta) meta = {};
    meta[channel] = { methodName: key.name, schema };
    classEventMetadata.set(channel, meta);
  };
}

/** ===== Service 装饰器 ===== */
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
    /** 注册 Action */
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

    /** 注册 Event */
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

/** ===== Inject 装饰器 ===== */
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
