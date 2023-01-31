import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  CacheType,
  Colors,
  EmbedBuilder,
  RoleSelectMenuBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { Event } from "../structures/event";
import { roles } from "../lib/roledata";

const handleBosyuu = async (i: ButtonInteraction<CacheType>) => {
  if (!i.message.embeds[0]) return;
  const embed = new EmbedBuilder()
    .setColor(i.message.embeds[0].color)
    .setTitle(i.message.embeds[0].title)
    .setAuthor(i.message.embeds[0].author)
    .setFooter(i.message.embeds[0].footer)
    .setDescription(i.message.embeds[0].description);
  const members = embed
    .toJSON()
    .description?.split("\n")
    .slice(1)
    .map((m) => m.match(/<@!?(\d+)>/)?.[1])
    .filter((m) => m) as string[] | undefined;
  if (!members) return;
  if (i.customId === "bosyuu_join") {
    if (members.includes(i.user.id)) {
      await i.reply({
        content: "あなたはすでに参加しています。",
        ephemeral: true,
      });
      return;
    }
    members.push(i.user.id);
    const max = Number(embed.toJSON().title?.match(/\((\d+)人\)/)?.[1]);
    if (members.length === max) {
      await i.update({
        embeds: [
          embed.setDescription(
            `参加者一覧\n${members.map((m) => `・<@${m}>`).join("\n")}`
          ),
        ],
        components: [],
      });
      return i.message.reply({
        content: `<@${members.join(">, <@")}>`,
        allowedMentions: { users: members },
      });
    } else {
      await i.update({
        embeds: [
          embed.setDescription(
            `参加者一覧\n${members.map((m) => `・<@${m}>`).join("\n")}`
          ),
        ],
      });
    }
  }
  if (i.customId === "bosyuu_leave") {
    if (!members.includes(i.user.id)) {
      await i.reply({ content: "あなたは参加していません。", ephemeral: true });
      return;
    }
    await i.update({
      embeds: [
        embed.setDescription(
          `参加者一覧\n${members
            .filter((m) => m !== i.user.id)
            .map((m) => `・<@${m}>`)
            .join("\n")}`
        ),
      ],
    });
  }
  if (i.customId === "bosyuu_cancel") {
    if (i.user.id !== embed.toJSON().footer?.text) {
      await i.reply({
        content: "あなたはこの募集を作成したユーザーではありません。",
        ephemeral: true,
      });
      return;
    }
    await i.update({
      embeds: [embed.setDescription("募集がキャンセルされました。")],
      components: [],
    });
  }
};

const verifyRole = process.env.VERIFY_ROLE_ID;

const handleVerify = async (i: ButtonInteraction<CacheType>) => {
  if (!i.member || !i.guild) return;
  const hasRole = verifyRole && i.guild.roles.cache.get(verifyRole);
  if (!hasRole) {
    await i.reply({
      content: "認証用の役職が設定されていません。",
      ephemeral: true,
    });
    return;
  }
  if (
    Array.isArray(i.member.roles)
      ? i.member.roles.includes(verifyRole)
      : i.member.roles.cache.has(verifyRole)
  ) {
    await i.reply({
      content: "あなたはすでに認証されています。",
      ephemeral: true,
    });
    return;
  }
  if (Array.isArray(i.member.roles)) {
    await i.reply({
      content: "認証ができない状態のようです...もう一度お試しください",
      ephemeral: true,
    });
    return;
  }
  await i.member.roles.add(verifyRole);
  await i.reply({ content: "認証が完了しました。", ephemeral: true });
};

const handleRolePanel = async (i: ButtonInteraction<CacheType>) => {
  if (!i.guild || !i.member || Array.isArray(i.member.roles)) return;
  const userRoles = i.member.roles.cache;
  const role = roles.find((r) => r.customId === i.customId);
  if (!role) return;
  await i.reply({
    ephemeral: true,
    embeds: [
      new EmbedBuilder()
        .setDescription(role.menu.description)
        .setColor(Colors.Gold),
    ],
    components: [
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(role.customId)
          .setPlaceholder("ロールを選択")
          .setMaxValues(role.menu.maxValues)
          .addOptions(
            ...role.menu.options.map((o) => ({
              label: o.name,
              value: o.id,
              emoji: o.emoji,
              default: userRoles.has(o.id),
            }))
          )
      ),
    ],
  });
};

const handleRolePanelRole = async (
  i: StringSelectMenuInteraction<CacheType>
) => {
  if (!i.member || !i.guild || Array.isArray(i.member.roles)) return;
  const role = roles.find((r) => r.customId === i.customId);
  if (!role) return;
  await i.deferReply({
    ephemeral: true,
  });
  const selected = i.values;
  const current = i.member.roles.cache
    .filter((r) => role.menu.options.map((o) => o.id).includes(r.id))
    .map((r) => r.id);
  const add = selected.filter((s) => !current.includes(s));
  const remove = current.filter((c) => !selected.includes(c));
  await i.member.roles.remove(remove);
  await i.member.roles.add(add);
  await i.editReply({
    content: "ロールを変更しました。",
  });
};

export const InteractionEvent: Event<"interactionCreate"> = {
  async run(client, i) {
    if (i.isChatInputCommand()) {
      const command = client.commands.get(i.commandName);
      if (!command) return;
      await command.run(i);
    } else if (i.isButton()) {
      if (i.customId.startsWith("bosyuu_")) {
        await handleBosyuu(i);
        return;
      } else if (i.customId === "v") {
        await handleVerify(i);
        return;
      } else if (i.customId.startsWith("rolepanel-")) {
        await handleRolePanel(i);
        return;
      }
    } else if (i.isStringSelectMenu()) {
      if (i.customId.startsWith("rolepanel-")) {
        await handleRolePanelRole(i);
        return;
      }
    }
  },
  name: "interactionCreate",
};
