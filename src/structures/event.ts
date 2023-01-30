import { ClientEvents } from "discord.js";
import { Client } from "./client";

export interface Event<T extends keyof ClientEvents> {
  run: (client: Client, ...args: ClientEvents[T]) => Promise<void> | void;
  name: T;
  once?: boolean;
}
