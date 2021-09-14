const Discord = require("discord.js");
const { SuccessColor, FailureColor } = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
  name: "random",
  description: "Temporary Command",
  aliases: ["rand"],
  usage: "None given",

  execute: async function (message) {
    //Create new embed.
    const randomEmbed = new Discord.MessageEmbed();
    const requestURL = "https://forum.ruffles.pw/api/v1/forum/getrandom";
    const results = await fetch(requestURL);
    const json = await results.json();

    if (json != null) {
      var title = json.title;
      var views = json.views;

      randomEmbed
        .setTitle(title)
        .setDescription(json.content.substring(0, 2048))
        .setFooter(`Views: ${views}`)
        .setTimestamp(Date.now())
        .setColor(SuccessColor);

      message.channel.send(randomEmbed);
    } else {
      randomEmbed
        .setAuthor("> Error 404")
        .setDescription("Sorry! I was unable to find that post")
        .setColor(FailureColor);
      message.channel.send(randomEmbed);
    }
  },
};
