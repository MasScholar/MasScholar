/// <reference types="vite/client" />
import type { ApiType } from "../electron/preload/index";
declare global {
  interface Window {
    NativeAPI: ApiType;
  }
}
