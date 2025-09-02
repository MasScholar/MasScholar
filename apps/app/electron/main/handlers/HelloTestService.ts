// main/services.ts
import { Service, Action, Event, subscribe } from "../framework";
import { z } from "zod";

/** ====== 用户服务 ====== */
@Service()
export class UserService {
  @Action("UserService.getUser", z.string())
  async getUser(id: string) {
    return { id, name: "Alice" };
  }

  @Action("UserService.updateUser", z.object({ id: z.string(), name: z.string() }))
  async updateUser(payload: { id: string; name: string }) {
    console.log("[UserService] updateUser:", payload);
    return { success: true };
  }
}

@Service()
export class ChatService {
  @Event("ChatService.sendMessage", z.object({ user: z.string(), text: z.string() }))
  sendMessage(msg: { user: string; text: string }) {
    console.log("[ChatService] Send message:", msg);
  }

  constructor() {
    subscribe("ChatService.sendMessage", (msg) => {
      console.log("[ChatService] Received message:", msg);
    });
  }
}
