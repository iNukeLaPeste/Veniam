module.exports = {
  embedMsg: {
    color: 0x0099ff,
    title: "Some title here",
    thumbnail: {
      url: "https://i.imgur.com/wSTFkRM.png"
    },
    fields: [
      {
        name: "Current price",
        value: "Some value here",
        inline: false
      },
      {
        name: "Pourcentage change (1H)",
        value: "Some value here",
        inline: true
      },
      {
        name: "Pourcentage change (24H)",
        value: "Some value here",
        inline: true
      },
      {
        name: "Pourcentage change (7 days)",
        value: "Some value here",
        inline: true
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Veniam, by iNukeLaPeste"
    }
  }
};
