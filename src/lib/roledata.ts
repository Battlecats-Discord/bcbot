export const roles = [
  {
    customId: "rolepanel-mention",
    label: "メンション関係",
    emoji: "925616273184915496",
    menu: {
      description: "メンションOK/NGを下から選択してください。",
      maxValues: 2,
      options: [
        {
          name: "メンションNG",
          id: "869887977201991710",
          emoji: "❌",
        },
        {
          name: "[通知]緊急クエスト",
          id: "958303597421031514",
          emoji: "🔔",
        },
      ],
    },
  },
  {
    customId: "rolepanel-sns",
    label: "SNS",
    emoji: "925617400374788107",
    menu: {
      description: "使用しているSNSを下から選択してください。",
      maxValues: 2,
      options: [
        {
          name: "Youtube",
          id: "869884178286653502",
          emoji: "926052858867118130",
        },
        {
          name: "Twitter",
          id: "869884091657510972",
          emoji: "926052833126649897",
        },
      ],
    },
  },
  {
    customId: "rolepanel-nyanko",
    label: "にゃんこ大戦争進行状況など",
    emoji: "925617714578460702",
    menu: {
      description: "にゃんこ大戦争の進行状況などを下から選択してください。",
      maxValues: 14,
      options: [
        {
          name: "日本編攻略中",
          id: "926054314328358932",
          emoji: "926060968822317087",
        },
        {
          name: "日本編3章クリア済み",
          id: "926054304312336435",
          emoji: "926071630692761650",
        },
        {
          name: "未来編3章クリア済み",
          id: "869888614778163200",
          emoji: "926072795882999828",
        },
        {
          name: "宇宙編3章クリア済み",
          id: "869888836501667880",
          emoji: "926076047378743306",
        },
        {
          name: "旧レジェ★1クリア済",
          id: "869888903971225640",
          emoji: "926076527723020288",
        },
        {
          name: "旧レジェ★2クリア済",
          id: "887468971807342653",
          emoji: "926077161960509502",
        },
        {
          name: "旧レジェ★3クリア済",
          id: "887469003080093718",
          emoji: "926077383293927484",
        },
        {
          name: "旧レジェ★4クリア済",
          id: "869889074767470613",
          emoji: "926078480033136650",
        },
        {
          name: "真レジェ★1クリア済",
          id: "887469139575328810",
          emoji: "926085443936731146",
        },
        {
          name: "真レジェアプデ待ち勢",
          id: "869889003602726992",
          emoji: "926085916483801090",
        },
        {
          name: "魔界編クリア済",
          id: "887468771479027764",
          emoji: "926079213746942042",
        },
        {
          name: "サブ垢持ち",
          id: "869888314327597066",
          emoji: "925617714578460702",
        },
        {
          name: "にゃんチューバー",
          id: "869889233198915615",
          emoji: "926052858867118130",
        },
        {
          name: "にゃんこ博士",
          id: "964803219861680148",
          emoji: "964817507967963226",
        },
      ],
    },
  },
  {
    customId: "rolepanel-up",
    label: "bump&up通知",
    emoji: "🆙",
    menu: {
      description: "bump/upの通知をします。\n下から選択してください。",
      maxValues: 2,
      options: [
        {
          name: "bump通知",
          id: "887332949211639808",
          emoji: "🆙",
        },
        {
          name: "up通知",
          id: "887332991821545522",
          emoji: "🆙",
        },
      ],
    },
  },
  {
    customId: "rolepanel-channel",
    label: "チャンネル表示・非表示",
    emoji: "925621327681978399",
    menu: {
      description:
        "追加で表示したいチャンネルを下から選択してください。\n非表示にしたい場合は選択を外してください",
      maxValues: 14,
      options: [
        {
          name: "［表示］ネタバレ",
          id: "887343027373359224",
          emoji: "925621327681978399",
        },
        {
          name: "［表示］NSFW",
          id: "888420436692578364",
          emoji: "925621327681978399",
        },
        {
          name: "［表示］愚痴部屋 ",
          id: "953287519070486559",
          emoji: "925621327681978399",
        },
        {
          name: "［表示］他ゲー全般  ",
          id: "987041622820786227",
          emoji: "925621327681978399",
        },
        {
          name: "［表示］音ゲー ",
          id: "987041815070924920",
          emoji: "925621327681978399",
        },
        {
          name: "［表示］Minecraft",
          id: "987041723001741322",
          emoji: "925621327681978399",
        },
        {
          name: "［表示］Apex",
          id: "999697003212713994",
          emoji: "925621327681978399",
        },
        {
          name: "［表示］モンスターハンター",
          id: "1005839984957337742",
          emoji: "925621327681978399",
        },
        {
          name: "[表示]モンスト",
          id: "976820435519954954",
          emoji: "925621327681978399",
        },
        {
          name: "[表示]ポケモン",
          id: "976820532462886912",
          emoji: "925621327681978399",
        },
        {
          name: "[表示]スマブラ",
          id: "975278018161410058",
          emoji: "925621327681978399",
        },
        {
          name: "[表示]スプラ",
          id: "976820683399102494",
          emoji: "925621327681978399",
        },
        {
          name: "[表示]原神",
          id: "1023745511255179354",
          emoji: "925621327681978399",
        },
        {
          name: "DJ",
          id: "1060924181828612107",
          emoji: "🎵",
        },
      ],
    },
  },
];

process.env.VERIFY_ROLE_ID = "865223132498100284";
process.env.EVENT_CHANNEL_ID = "964167060097740810";
process.env.MEMBER_ROLE_ID = "875352189709733968";
