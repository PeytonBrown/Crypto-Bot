const Discord = require('discord.js');

module.exports = {
	name: 'setup',
	description: 'Displays Setup Instructions',
	execute(message) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Setup')
        .addFields(
            { name: 'Step 1', value: 'Run the set channel command to specify a channel the bot will post update messages. \n\n Example:```.c set-channel #general```' },
            { name: 'Step 2', value: 'Add a coin to your list. \n\n Example:```.c add-coin ethereum```' },
            { name: 'Help', value: 'More Commands: ```.c help```' },
            { name: 'Set Timezone', value: 'Change the timezone. \n\n Example:```.c set-timezone edt```' },
            { name: 'Set Currency', value: 'Change the currency. \n\n Example:```.c set-currency usd```' },
        )
        .setFooter('Powered by CoinGecko API', 'https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png');
		message.channel.send(helpEmbed);
	},
};
