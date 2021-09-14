const Discord = require("discord.js");
const { SuccessColor, FailureColor } = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
  name: "read",
  description: "Temporary Command",
  aliases: ["get"],
  usage: "None given",

  execute: async function (message, args) {
    //Remove prefix.
    const idLookup = args.join(" ");
    //Create new embed.
    const embed = new Discord.MessageEmbed();
    const requestURL = "https://forum.ruffles.pw/api/v1/forum";
    const results = await fetch(`${requestURL}/${idLookup}`);
    const json = await results.json();

    if (json != null) {
      var content = json.content.substring(0, 2048);
      var title = json.title;
      var views = json.views;
      embed.setTitle(title);
      embed.setDescription(content);
      embed.setFooter(`Views: ${views}`);
      embed.setTimestamp(Date.now());
      embed.setColor(SuccessColor);
      message.channel.send(embed);
    } else {
      embed.setAuthor("> Error 404");
      embed.setDescription("Sorry! I was unable to find that post");
      embed.setColor(FailureColor);
      message.channel.send(embed);
    }
  },
};
