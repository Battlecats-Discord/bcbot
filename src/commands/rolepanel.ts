import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  EmbedBuilder,
  Colors,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import { Command } from "../structures/command";
import { roles } from "../lib/roledata";

const buttons = roles.map(({ label, customId, emoji }) =>
  new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setLabel(label)
    .setCustomId(customId)
    .setEmoji(emoji)
);

export const RolepanelCommand: Command = {
  async run(i) {
    if (
      !i.member ||
      typeof i.member.permissions === "string" ||
      !i.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      await i.reply({
        content: "あなたはこのコマンドを実行する権限を持っていません。",
        ephemeral: true,
      });
      return;
    }
    await i.reply({ content: "ロールパネルを設置します。", ephemeral: true });
    await i.channel?.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("ロールパネル")
          .setColor(Colors.Gold)
          .setDescription("ロールを付与するにはボタンを押してください"),
      ],
      components: buttons.map((x) =>
        new ActionRowBuilder<ButtonBuilder>().setComponents(x)
      ),
    });
  },
  name: "rolepanel",
  data: new SlashCommandBuilder().setDescription("ロールパネルを設置します"),
};
