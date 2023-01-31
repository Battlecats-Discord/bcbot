import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../structures/command";
import { search } from "../lib/search";

export const DbCommand: Command = {
  async run(i) {
    const query = i.options.getString("query");
    if (!query) return;
    const result = await search(query, "battlecats-db.com");
    if (!result) return;
    await i.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("にゃんこdbからの検索結果")
          .setDescription(
            result.map((item) => `[${item.title}](${item.link})`).join("\n")
          )
          .setColor(Colors.Gold)
          .setFooter({
            text: "にゃんこdb",
            iconURL: "https://battlecats-db.com/favicon.ico",
          }),
      ],
    });
  },
  name: "db",
  data: new SlashCommandBuilder()
    .setDescription("にゃんこdbから検索します")
    .addStringOption((option) =>
      option.setName("query").setDescription("検索する文字列").setRequired(true)
    ),
};
