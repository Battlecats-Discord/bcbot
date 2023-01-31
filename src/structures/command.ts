import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  run: (i: ChatInputCommandInteraction) => void | Promise<void>;
  name: string;
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
}
