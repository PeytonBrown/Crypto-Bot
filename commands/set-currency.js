const fs = require('fs');

const { Currencies } = require('../data/CurrencyList.json');


  module.exports = {
	name: 'set-currency',
	description: 'Set currency for messages',
	async execute(message, args) {

        if (!args.length)
            return message.channel.send(`You didn't provide any arguments!`);
        
            var currency = args[0].toLowerCase();

            var exists = false;
            Currencies.forEach(element => {
                if (element.id == currency)
                    exists = true;
            });
    
            if (exists == false)
            return message.channel.send('Currency Not Found or Not Supported!');


        var filename = "./servers/" + message.guild.id + ".json";

        var data = JSON.parse(fs.readFileSync(filename));

        data.currency = currency;

        fs.writeFile(filename, JSON.stringify(data), function(err, result) {
            if(err) console.log('error', err);
        });

        message.channel.send("Currency set to: " + currency);

	},
};