const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

client.commands = new Map();

const fs = require("fs");

const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {

const command = require(`./commands/${file}`);

client.commands.set(command.data.name, command);

}

client.on("interactionCreate", async interaction => {

if (!interaction.isChatInputCommand()) return;

const command = client.commands.get(interaction.commandName);

if (!command) return;

try {

await command.execute(interaction);

} catch (error) {

console.error(error);

interaction.reply({ content: "Error executing command.", ephemeral: true });

}

});

client.once("ready", () => {

console.log(`Logged in as ${client.user.tag}`);

});

client.login(process.env.TOKEN);
