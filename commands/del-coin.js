const fs = require('fs');

function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

  module.exports = {
	name: 'del-coin',
	description: 'remove coin from coin list',
	execute(message, args) {

        var coin = args[0].toLowerCase();

        var filename = "./servers/" + message.guild.id + ".json";

        var data = JSON.parse(fs.readFileSync(filename));

        var exists = false;
        data.coins.forEach(element => {
            if (element == coin)
                exists = true;
        });

        if (!exists)
        return message.channel.send('Coin is not in List!');

        removeElement(data.coins, coin);

        fs.writeFile(filename, JSON.stringify(data), function(err, result) {
            if(err) console.log('error', err);
        });

        message.channel.send(coin + ' Removed from List');
	},
};
