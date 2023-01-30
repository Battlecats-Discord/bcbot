import { Client as DiscordClient, IntentsBitField, Partials } from "discord.js";
import { Command } from "./command";
import { Event } from "./event";

export class Client extends DiscordClient {
  commands: Map<string, Command> = new Map();
  constructor() {
    super({
      intents: new IntentsBitField(3276803).remove(
        IntentsBitField.Flags.DirectMessageTyping,
        IntentsBitField.Flags.GuildMessageTyping
      ),
      allowedMentions: {
        parse: [],
        repliedUser: false,
      },
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
      ],
    });
  }
  loadCommand(cmd: Command) {
    cmd.data.setName(cmd.name);
    this.commands.set(cmd.name, cmd);
    return this;
  }
  loadEvent(e: Event<any>) {
    this[e.once ? "once" : "on"](e.name, (...args) => e.run(this, ...args));
    return this;
  }
}
