import { ChannelType } from "discord.js";
import { Client } from "../structures/client";

const parent = process.env.VC_PARENT;
const excluded = process.env.VC_EXCLUDED?.split(",") ?? [];
const guild = process.env.GUILD_ID;

export function getEmpty(client: Client) {
	if (!(excluded.length && parent && guild)) return [];
	const vcs = client.channels.cache.filter(
		(c) => "parentId" in c && c.parentId === parent
	);
	return vcs
		.filter(
			(x) =>
				!excluded.includes(x.id) &&
				x.type === ChannelType.GuildVoice &&
				x.guildId === guild &&
				x.createdTimestamp + 1000 * 60 * 5 < Date.now() && x.members.size === 0
		)
		.map((x) => x.id);
}

export function purgeEmpty(client: Client) {
	const empty = getEmpty(client);
	for (const vc of empty) {
		client.channels.cache.get(vc)?.delete();
	}
}
