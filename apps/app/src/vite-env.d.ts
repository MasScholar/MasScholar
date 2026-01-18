/// <reference types="vite/client" />
import type { ApiType } from '../electron/preload/index'
declare global {
  interface Window {
    NATIVE_API: ApiType
  }
}
