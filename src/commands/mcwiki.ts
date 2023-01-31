import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../structures/command";
import { search } from "../lib/search";

export const McwikiCommand: Command = {
  async run(i) {
    const query = i.options.getString("query");
    if (!query) return;
    const result = await search(query, "minecraft.fandom.com");
    if (!result) return;
    await i.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Minecraft Wikiからの検索結果")
          .setDescription(
            result.map((item) => `[${item.title}](${item.link})`).join("\n")
          )
          .setColor(Colors.Gold)
          .setFooter({
            text: "Minecraft Wiki",
            iconURL:
              "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e6/Site-logo.png/revision/latest",
          }),
      ],
    });
  },
  name: "mcwiki",
  data: new SlashCommandBuilder()
    .setDescription("Minecraft Wikiから検索します")
    .addStringOption((option) =>
      option.setName("query").setDescription("検索する文字列").setRequired(true)
    ),
};
