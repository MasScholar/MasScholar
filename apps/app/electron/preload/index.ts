import { contextBridge, ipcRenderer } from "electron";

const api = {
  user: {
    getUser: (id: string) => ipcRenderer.invoke("UserService.getUser", id),
    updateUser: (payload: { id: string; name: string }) => ipcRenderer.invoke("UserService.updateUser", payload),
  },
  chat: {
    sendMessage: (msg: { user: string; text: string }) => ipcRenderer.send("ChatService.sendMessage", msg),
  },
};

contextBridge.exposeInMainWorld("NATIVE_API", api);
export type ApiType = typeof api;
