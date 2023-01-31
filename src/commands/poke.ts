import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../structures/command";
import { search } from "../lib/search";

export const PokeCommand: Command = {
  async run(i) {
    const query = i.options.getString("query");
    if (!query) return;
    const result = await search(query, "yakkun.com/sv");
    if (!result) return;
    await i.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("ポケ徹からの検索結果")
          .setDescription(
            result.map((item) => `[${item.title}](${item.link})`).join("\n")
          )
          .setColor(Colors.Gold)
          .setFooter({
            text: "ポケ徹",
            iconURL: "https://yakkun.com/favicon.ico",
          }),
      ],
    });
  },
  name: "poke",
  data: new SlashCommandBuilder()
    .setDescription("ポケ徹から検索します")
    .addStringOption((option) =>
      option.setName("query").setDescription("検索する文字列").setRequired(true)
    ),
};
