import { SlashCommandBuilder } from "discord.js";
import { Command } from "../structures/command";

export const PingCommand: Command = {
  async run(i) {
    await i.reply("このbotは動作しているようです");
  },
  name: "ping",
  data: new SlashCommandBuilder().setDescription("生存確認をします"),
};
