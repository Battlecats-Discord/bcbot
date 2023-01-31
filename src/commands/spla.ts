import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../structures/command";
import { search } from "../lib/search";

export const SplaCommand: Command = {
  async run(i) {
    const query = i.options.getString("query");
    if (!query) return;
    const result = await search(query, "wikiwiki.jp/splatoon3mix/");
    if (!result) return;
    await i.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("スプラwikiからの検索結果")
          .setDescription(
            result.map((item) => `[${item.title}](${item.link})`).join("\n")
          )
          .setColor(Colors.Gold)
          .setFooter({
            text: "スプラwiki",
            iconURL:
              "https://cdn.wikiwiki.jp/to/w/splatoon3mix/FrontPage/::ref/Splatoon3%20top.webp",
          }),
      ],
    });
  },
  name: "spla",
  data: new SlashCommandBuilder()
    .setDescription("スプラwikiから検索します")
    .addStringOption((option) =>
      option.setName("query").setDescription("検索する文字列").setRequired(true)
    ),
};
