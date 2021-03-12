const config = require("./config.json");
const discord = require("discord.js");
const fs = require("fs");

const client = new discord.Client({
  fetchAllMembers: true,
});

client.login(config.token);
client.commands = new discord.Collection();

fs.readdir("./commands", (err, file_names) => {
  if (err) throw err;

  file_names.forEach((file_name) => {
    if (!file_name.endsWith(".js")) return;

    const command = require(`./commands/${file_name}`);
    client.commands.set(command.name, command);
  });
});

client.on("message", (message) => {
  if (message.type !== "DEFAULT" || message.author.bot) return;

  const args = message.content.trim().split(/ +/g);
  const command_name = args.shift().toLowerCase();

  if (!command_name.startsWith(config.prefix)) return;

  const command = client.commands.get(command_name.slice(config.prefix.length));
  console.log(`command: ${command.name}, args: [ ${args.concat(", ")} ]`);
  command.run(message, args, client);
});
