import { Event } from "../structures/event";

export const InteractionEvent: Event<"interactionCreate"> = {
  async run(client, i) {
    if(i.isCommand()){
        const command = client.commands.get(i.commandName);
        if(!command) return;
        await command.run(i);
    }
  },
  name: "interactionCreate",
};
