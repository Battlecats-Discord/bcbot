import {
	GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel,
	SlashCommandBuilder,
} from "discord.js";
import { Command } from "../structures/command";

function getDate(
	year?: number | null,
	month?: number | null,
	day?: number | null,
	hour?: number | null,
	minute?: number | null
) {
	const date = new Date();
	if (year) date.setFullYear(year);
	if (month) date.setMonth(month - 1);
	if (day) date.setDate(day);
	if (hour) date.setHours(hour);
	if (minute) date.setMinutes(minute);
	return date;
}

export const EventCommand: Command = {
	async run(i) {
		if (
			!i.guild ||
			!i.member ||
			!process.env.EVENT_CHANNEL_ID ||
			!process.env.MEMBER_ROLE_ID
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
		const date = getDate(
			i.options.getInteger("year"),
			i.options.getInteger("month"),
			i.options.getInteger("day"),
			i.options.getInteger("hour"),
			i.options.getInteger("minute")
		);
		const event = await i.guild.scheduledEvents.create({
			name: i.options.getString("title", true),
			description: i.options.getString("description", true),
			channel: process.env.EVENT_CHANNEL_ID,
			scheduledStartTime: date,
			privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
			entityType: GuildScheduledEventEntityType.Voice,
			image: i.options.getAttachment("image")?.url,
		});
		await i.reply({ content: `イベントを作成しました。 ${event.url}` });
	},
	name: "event",
	data: new SlashCommandBuilder()
		.setDescription("配信イベントの予約をします")
		.addStringOption((o) =>
			o.setName("title").setDescription("イベントのタイトル").setRequired(true)
		)
		.addStringOption((o) =>
			o
				.setName("description")
				.setDescription("イベントの説明")
				.setRequired(true)
		)
		.addIntegerOption((o) =>
			o.setName("year").setDescription("イベントの年").setRequired(false)
		)
		.addIntegerOption((o) =>
			o.setName("month").setDescription("イベントの月").setRequired(false)
		)
		.addIntegerOption((o) =>
			o.setName("day").setDescription("イベントの日").setRequired(false)
		)
		.addIntegerOption((o) =>
			o.setName("hour").setDescription("イベントの時").setRequired(false)
		)
		.addIntegerOption((o) =>
			o.setName("minute").setDescription("イベントの分").setRequired(false)
		)
		.addAttachmentOption((o) =>
			o.setName("image").setDescription("イベントの画像").setRequired(false)
		)
};
