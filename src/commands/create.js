const fetch = require("node-fetch");
const Discord = require("discord.js");
const { SuccessColor, IllusiveToken } = require("../../config.json");

module.exports = {
  name: "create",
  description: "Temporary Command",
  aliases: ["new,post"],
  usage: "Create a new post on illusive",

  execute: async function (client, message, args) {
    var title;
    var content;

    let command = message.content;
    let channel = message.channel;

    //Some string manipulation that removes the square parenthesis to allow for both Titles and Descriptions
    let titleStart = command.indexOf("[");
    let titleEnd = command.indexOf("]");
    title = command.substr(titleStart + 1, titleEnd - titleStart - 1);

    let contentStart = command.indexOf("[", titleStart + 1);
    let contentEnd = command.indexOf("]", titleEnd + 1);

    content = command.substr(contentStart + 1, contentEnd - contentStart - 1);

    //Create new embed
    let embed = new Discord.MessageEmbed();
    embed.description = "Successfully created post!";
    embed.color = SuccessColor;

    const rawResponse = await fetch(
      "https://forum.ruffles.pw/api/v1/forum/createpost",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${IllusiveToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, content: content, id: "bruh@" }),
      }
    );
    const res = await rawResponse.json();
    console.log(res);
    embed.setTitle = "Successfully created post here!";

    channel.send(embed);
  },
};
