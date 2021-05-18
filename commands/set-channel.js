const fs = require('fs');

  module.exports = {
	name: 'set-channel',
	description: 'Set channel for messages',
	async execute(message, args) {

        if (!args.length)
            return message.channel.send(`You didn't provide any arguments!`);
        
        var channel = message.mentions.channels.first();

        if (channel == null)
        return message.channel.send('Invalid Channel!');

        var msg = await channel.send('Initial Message, Do not delete!\n This message will be updated soon');


        var filename = "./servers/" + message.guild.id + ".json";

        var data = JSON.parse(fs.readFileSync(filename));

        data.channelId = channel.id;
        data.messageId = msg.id;

        fs.writeFile(filename, JSON.stringify(data), function(err, result) {
            if(err) console.log('error', err);
        });

        message.channel.send("Channel Set!");
	},
};