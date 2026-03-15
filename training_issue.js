const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");

function generateID(){
return "TR-" + Math.floor(Math.random()*9000+1000);
}

module.exports = {

data: new SlashCommandBuilder()

.setName("training_issue")

.setDescription("Issue a training")

.addStringOption(option =>
option.setName("host")
.setDescription("Select host")
.setRequired(true)
.addChoices(
{name:"Alpha",value:"Alpha"},
{name:"Bravo",value:"Bravo"},
{name:"Charlie",value:"Charlie"}
))

.addStringOption(option =>
option.setName("level")
.setDescription("Cadet level")
.setRequired(true)
.addChoices(
{name:"Level 1",value:"1"},
{name:"Level 2",value:"2"},
{name:"Level 3",value:"3"}
))

.addStringOption(option =>
option.setName("time")
.setDescription("Training time (YYYY-MM-DD HH:MM)")
.setRequired(true)
),

async execute(interaction){

const host = interaction.options.getString("host");

const level = interaction.options.getString("level");

const time = interaction.options.getString("time");

const id = generateID();

const unix = Math.floor(new Date(time).getTime()/1000);

const embed = new EmbedBuilder()

.setTitle("Security Training Issued")

.setThumbnail("SECURITY_LOGO_URL")

.addFields(
{name:"Training ID",value:id},
{name:"Host",value:host},
{name:"Cadet Level",value:`Level ${level}`},
{name:"Time",value:`<t:${unix}:F>`}
)

.setColor("Red");

const channel = interaction.guild.channels.cache.get("TRAINING_CHANNEL_ID");

channel.send({
content:"@cadets",
embeds:[embed]
});

interaction.reply({
content:`Training ${id} issued`,
ephemeral:true
});

}

};
