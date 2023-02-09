import { Channel, ChannelType, VoiceChannel } from "discord.js";
import { Client } from "../structures/client";

const parent = process.env.VC_PARENT;
const excluded = process.env.VC_EXCLUDED?.split(",") ?? [];
const guild = process.env.GUILD_ID;

export async function getEmpty(client: Client) {
	if (!(excluded.length && parent && guild)) return [];
	const vcs = client.channels.cache.filter(
		(c) =>
			"parentId" in c &&
			c.parentId === parent &&
			c.type === ChannelType.GuildVoice &&
			c.guildId === guild &&
			!excluded.includes(c.id) &&
			c.createdTimestamp + 1000 * 60 * 5 < Date.now()
	);
	const vcList: VoiceChannel[] = [];
	for (const vc of vcs.values()) {
		vcList.push((await (vc as VoiceChannel).fetch(true)) as VoiceChannel);
	}
	return vcList.filter((x) => x.members.size === 0).map((x) => x.id);
}

export async function purgeEmpty(client: Client) {
	const empty = await getEmpty(client);
	for (const vc of empty) {
		client.channels.cache.get(vc)?.delete();
	}
}
