import { Event } from "../structures/event";

export const ReadyEvent: Event<"ready"> = {
  async run(client) {
    console.log(`Logged in as ${client.user?.tag}!`);
    const commands = [];
    for (const command of client.commands.values()) {
      commands.push(command.data.toJSON());
    }
    client.application?.commands.set(commands);
  },
  name: "ready",
  once: true,
};
