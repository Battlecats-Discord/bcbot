import { Event } from "../structures/event";

export const GuildMemberAddEvent: Event<"guildMemberAdd"> = {
  async run(client, m) {},
  name: "guildMemberAdd",
};
