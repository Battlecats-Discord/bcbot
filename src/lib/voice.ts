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

export async function getConnectionList(client: Client) {
	if (!guild) return null;
	const members = client.guilds.cache
		.get(guild)
		?.members.cache?.filter((x) => x.voice.channelId);
	if (!members) return null;
	const trueMembers: Exclude<ReturnType<typeof members.get>, undefined>[] = [];
	for (const member of members.values()) {
		trueMembers.push(await member.fetch());
	}
	const channels = trueMembers.map((x) => ({
		id: x.id,
		vc: x.voice.channelId,
	}));
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

export async function getEmpty(client: Client) {
	const vcs = getVcList(client);
	const conns = await getConnectionList(client);
	if (!conns) return [];
	const empty = vcs.filter((x) => conns.get(x) === 0 || !conns.has(x));
	return empty;
}

export async function purgeEmpty(client: Client) {
	const empty = await getEmpty(client);
	for (const vc of empty) {
		client.channels.cache.get(vc)?.delete();
	}
}
