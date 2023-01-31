import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "../structures/command";

export const VerifyCommand: Command = {
  async run(i) {
    if(!i.member || typeof i.member.permissions === "string" || !i.member.permissions.has(PermissionFlagsBits.Administrator)) { 
        await i.reply({ content: "あなたはこのコマンドを実行する権限を持っていません。", ephemeral: true });
        return;
    }
    await i.reply({ content: "認証パネルを設置します。", ephemeral: true });
    await i.channel?.send({
        embeds: [
            new EmbedBuilder()
            .setTitle("認証")
            .setDescription("認証を行うには下のボタンを押してください。")
            .setColor(Colors.Gold)
        ],
        components: [
            new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("v")
                .setLabel("認証")
                .setStyle(ButtonStyle.Primary)
            )

        ]
    });
  },
  name: "verify",
  data: new SlashCommandBuilder().setDescription("認証パネルを設置します"),
};
