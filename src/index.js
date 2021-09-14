//Discord Initialization
const Discord = require("discord.js");
const { readdirSync } = require("fs");
const { BotToken, PREFIX, SuccessColor } = require("../config.json");

// Creating a new bot client that we login with
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Going through each command and setting the command to the actual discord command
const commandFiles = readdirSync(`./src/commands`).filter((file) =>
  file.endsWith(".js")
);
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.mentions.has(client.user.id)) {
    //we check, whether the bot is mentioned, client.user returns the user that the client is logged in as
    let embed = new Discord.MessageEmbed();
    embed.setDescription(`**yes sir**`);
    embed.setColor(SuccessColor);
    message.channel.send(embed);
  }
  //Checking if message starts with prefix, the message was sent by a bot or if the message was in a direct message. If so, returning.
  if (
    !message.content.startsWith(PREFIX) ||
    message.author.bot ||
    message.channel.type === "dm"
  )
    return;

  //String Manipulation to remove the prefix and lowercasing all arguments so they are not case-senstitive
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();
  // fullCmd includes the command AS WELL AS its aliases
  const fullCmd =
    client.commands.get(command) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
  if (!fullCmd) return;

  //Trying to execute the fullCmd, passed in arguments: client, message and args.
  try {
    fullCmd.execute(client, message, args);
  } catch (error) {
    console.error(error);
  }
});

//Just a simple console log for debugging an error if the bot fails to turn on
client.on("error", console.error);

client.on("ready", () => {
  //Run if the bot starts, and logs in, successfully.
  client.user.setActivity(
    `>help | Helping out ${client.users.cache.size} users.`
  );
  commandFiles.forEach((cmd) => {
    console.log(`${cmd} loaded.`);
  });
});

//Login with the bot token provided in config.json.
client.login(BotToken);
