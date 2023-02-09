import { ChannelType, Collection } from "discord.js";
import { Client } from "../structures/client";

const parent = process.env.VC_PARENT;
const excluded = process.env.VC_EXCLUDED?.split(",") ?? [];
const guild = process.env.GUILD_ID;

export function getVcList(client: Client) {
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
				x.createdTimestamp + 1000 * 60 * 5 < Date.now()
		)
		.map((x) => x.id);
}

export function getConnectionList(client: Client) {
	if (!guild) return null;
	const members = client.guilds.cache.get(guild)?.members.cache;
	const channels =
		members
			?.map((x) => ({ vc: x.voice.channelId, member: x.id }))
			.filter((x) => x.vc) ?? [];
	console.log(channels);
	const c = new Collection<string, number>();
	for (const channel of channels) {
		if (!channel.vc) continue;
		if (c.has(channel.vc)) {
			c.set(channel.vc, (c.get(channel.vc) ?? 0) + 1);
		} else {
			c.set(channel.vc, 1);
		}
	}
	return c;
}

export function getEmpty(client: Client) {
	const vcs = getVcList(client);
	const conns = getConnectionList(client);
	if (!conns) return [];
	const empty = vcs.filter((x) => conns.get(x) === 0 || !conns.has(x));
	return empty;
}

export function purgeEmpty(client: Client) {
	const empty = getEmpty(client);
	for (const vc of empty) {
		client.channels.cache.get(vc)?.delete();
	}
}