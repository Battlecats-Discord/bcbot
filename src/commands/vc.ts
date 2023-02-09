import {
	ChannelType,
	Colors,
	EmbedBuilder,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";
import { Command } from "../structures/command";

const verifyRole = process.env.VERIFY_ROLE_ID;

export const CreateVcCommand: Command = {
	async run(i) {
		if (
			!i.guild ||
			!i.member ||
			!process.env.EVENT_CHANNEL_ID ||
			!process.env.MEMBER_ROLE_ID ||
            !process.env.VC_PARENT ||
            !verifyRole
		)
			return;
		if (
			Array.isArray(i.member.roles)
				? !i.member.roles.includes(process.env.MEMBER_ROLE_ID)
				: !i.member.roles.cache.has(process.env.MEMBER_ROLE_ID)
		) {
			await i.reply({
				content: "イベントを作成するには常連になる必要があります。",
				ephemeral: true,
			});
			return;
		}
		const query = i.options.getString("query");
		if (!query) return;
		if(query.length > 7) {
			await i.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle("エラー")
						.setDescription("VC名は7文字以下にしてください")
						.setColor(Colors.Red)
				]
			});
			return;
		}
		const limit = i.options.getInteger("limit");
		const channel = await i.guild.channels.create({
            name: `🔊｜${query}`,
			type: ChannelType.GuildVoice,
			parent: process.env.VC_PARENT,
			permissionOverwrites: [
				{
					id: i.guild.id,
					deny: [PermissionFlagsBits.Connect],
				},
				{
					id: verifyRole,
					allow: [PermissionFlagsBits.Connect],
				},
			],
			userLimit: limit || undefined
		});
        await i.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("VCを作成しました")
                    .setDescription(`VC名: ${query}\nVC ID: <#${channel.id}>`)
                    .setColor(Colors.Gold)
            ]
        });
	},
	name: "createvc",
	data: new SlashCommandBuilder()
		.setDescription("VCを作成します")
		.addStringOption((option) =>
			option.setName("query").setDescription("名前").setRequired(true)
		)
		.addIntegerOption((option) =>
			option.setName("limit").setDescription("最大人数").setMaxValue(99).setMinValue(1)
		),
};
