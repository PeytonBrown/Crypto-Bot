const fs = require('fs');
const { Timezones } = require('../data/Timezones.json');



  module.exports = {
	name: 'set-timezone',
	description: 'Set timezone for messages',
	async execute(message, args) {

        if (!args.length)
            return message.channel.send(`You didn't provide any arguments!`);
        
        var timezone = args[0].toUpperCase();

            var exists = false;
            Timezones.forEach(element => {
                if (element.abbr == timezone)
                    exists = true;
            });

            if (exists == false)
            return message.channel.send('Timezone Not Found or Not Supported!');

        var filename = "./servers/" + message.guild.id + ".json";

        var data = JSON.parse(fs.readFileSync(filename));

        data.timezone = timezone;

        fs.writeFile(filename, JSON.stringify(data), function(err, result) {
            if(err) console.log('error', err);
        });

        message.channel.send("Timezone set to: " + timezone);

	},
};