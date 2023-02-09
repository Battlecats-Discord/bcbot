import { getEmpty } from "../lib/voice";
import { Event } from "../structures/event";

export const ReadyEvent: Event<"ready"> = {
	async run(client) {
		console.log(`Logged in as ${client.user?.tag}!`);
		const commands = [];
		for (const command of client.commands.values()) {
			commands.push(command.data.toJSON());
		}
		client.application?.commands.set(commands);
		setInterval(async() => {
			console.log(await getEmpty(client))
		}, 1000 * 60 * 5);
		console.log(await getEmpty(client))
		process.stdin.on("data", d => {
			if (d.toString().trim() === "get") {
				getEmpty(client).then(x => {
					console.log(x);
				});
			}
		})
	},
	name: "ready",
	once: true,
};
