import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../structures/command";

export const BosyuuCommand: Command = {
  async run(i) {
    const number = i.options.getInteger("number");
    const text = i.options.getString("text");
    if (!number || !text) return;
    if (number > 50) {
      await i.reply("50人以上は募集できません。そもそもそんなに来ません。");
      return;
    }
    await i.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Gold)
          .setTitle(`募集: ${text} (${number}人)`)
          .setAuthor({
            name: i.user.username,
            iconURL: i.user.displayAvatarURL(),
          })
          .setDescription(`参加者一覧\n・<@${i.user.id}>`)
          .setFooter({ text: i.user.id }),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().setComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel("参加")
            .setCustomId("bosyuu_join"),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel("退出")
            .setCustomId("bosyuu_leave"),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel("キャンセル")
            .setCustomId("bosyuu_cancel")
        ),
      ],
    });
  },
  name: "bosyuu",
  data: new SlashCommandBuilder()
    .setDescription("募集を開始します")
    .addIntegerOption((option) =>
      option.setName("number").setDescription("募集人数").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("募集内容").setRequired(true)
    ),
};
