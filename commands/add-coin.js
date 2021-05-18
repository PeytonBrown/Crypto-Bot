const fs = require('fs');
const CoinList = require('../data/CoinList.json');
const { UpdateList } = require('../data/CoinCache.json');

  module.exports = {
	name: 'add-coin',
	description: 'Add coin to coin list',
	async execute(message, args) {

        var coin = args[0].toLowerCase();

        var exists = false;
        CoinList.forEach(element => {
            if (element.id == coin)
                exists = true;
        });

        if (exists == false)
        return message.channel.send('Coin Not Found!');

        var filename = "./servers/" + message.guild.id + ".json";

        var data = JSON.parse(fs.readFileSync(filename));

        exists = false;
        data.coins.forEach(element => {
            if (element == coin)
                exists = true;
        });

        if (exists)
        return message.channel.send('Coin Already in List!');

        data.coins.push(coin);

        fs.writeFile(filename, JSON.stringify(data), function(err, result) {
            if(err) console.log('error', err);
        });

        message.channel.send(coin + ' Added to List');
        exists = false;
        UpdateList.forEach(element => {
            if (element == coin)
                exists = true;
        });

        if (exists == false)
        {
            var CoinCache = JSON.parse(fs.readFileSync('./data/CoinCache.json'));

            CoinCache.UpdateList.push(coin);

            fs.writeFileSync('./data/CoinCache.json', JSON.stringify(CoinCache));
        }
	},
};
