const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Displays Commands',
	execute(message) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commands')
        .addFields(
            { name: 'Setup', value: '```.c setup```' },
            { name: 'Set Channel', value: '```.c set-channel```' },
            { name: 'Set Currency', value: '```.c set-currency```' },
            { name: 'Set Timezone', value: '```.c set-timezone```' },
            { name: 'Add Coin', value: '```.c add-coin```' },
            { name: 'Del Coin', value: '```.c del-coin```' },
        )
        .setFooter('Powered by CoinGecko API', 'https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png');
		message.channel.send(helpEmbed);
	},
};
