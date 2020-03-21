require("dotenv").config();
const Discord = require("discord.js");

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.commands = new Discord.Collection();
const botCommands = require("./commands/commands");

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged as ${bot.user.tag}!`);
});

bot.on("message", msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("I am so sorry, but I could not execute this command.");
  }
});
