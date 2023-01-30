import { CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  run: (i: CommandInteraction<CacheType>) => void | Promise<void>;
  name: string;
  data: SlashCommandBuilder;
}
