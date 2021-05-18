const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { updateMessages } = require('./functions/update-messages');
const { updateCache } = require('./functions/update-cache');
const { getDate } = require('./functions/get-date');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
  client.user.setActivity(".c setup"); 

});

client.on('guildCreate', guild => { // When Bot Joins, Create File

  var string = JSON.stringify({

    channelId: '',
    messageId: '',
    coins: ['bitcoin'],
    currency: 'usd',
    timezone: 'edt',

  });

  fs.writeFile("./servers/" + guild.id + ".json", string, function(err, result) {
    if(err) console.log('error', err);
});
});


client.on('guildDelete', guild => { // When Bot Leaves, Delete File

  fs.unlink("./servers/" + guild.id + ".json", function(err, result) {
    if(err) console.log('error', err);
});
});



client.on('message', async message => {

  if (message.channel.type == "dm") return;
  if (!message.content.startsWith(prefix) || message.author.bot  || !message.member.hasPermission('ADMINISTRATOR')) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;

	try {
		await client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);

var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(async () => {
  console.log("Updated at " + getDate('edt'));
  await updateCache();
  updateMessages(client);
}, the_interval);