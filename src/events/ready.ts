import { Event } from "../structures/event";

export const ReadyEvent: Event<"ready"> = {
  async run(client) {
    console.log(`Logged in as ${client.user?.tag}!`);
  },
  name: "ready",
  once: true,
};
