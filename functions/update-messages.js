const fs = require('fs');
const { getDate } = require('./get-date');



async function updateMessages(client)
{

    for (const guild of client.guilds.cache.array()) {

        var filename = "./servers/" + guild.id + ".json";
        var data = JSON.parse(fs.readFileSync(filename));

        var channel = guild.channels.cache.find(channel => channel.id === data.channelId);

        if (channel == null)
        {
            console.log("Channel Doesn't Exist");
            continue;
        }

        var message = null;
        try {
        message = await channel.messages.fetch(data.messageId);
        } catch (error) {
        console.log("message Doesn't Exist");
        console.error(error);
        continue;
      }

      var updatedMessage = "";

      updatedMessage += "Last Updated: " + getDate(data.timezone) + " "+  data.timezone.toUpperCase() +"\n";
      updatedMessage += "Current Currency: " + data.currency.toUpperCase() +"\n\n";


      var CoinCache = JSON.parse(fs.readFileSync('./data/CoinCache.json'));

        data.coins.forEach(coin => {
            updatedMessage += '`' + CoinCache.Coins[coin].symbol.toUpperCase() + ' => $' +  CoinCache.Coins[coin].market_data.current_price[data.currency];
            if (CoinCache.Coins[coin].market_data.price_change_percentage_24h > 0)
                updatedMessage += ' ( +' +  (Math.round(CoinCache.Coins[coin].market_data.price_change_percentage_24h * 100) / 100) + '% )`\n';
            else
                updatedMessage += ' ( ' + (Math.round(CoinCache.Coins[coin].market_data.price_change_percentage_24h * 100) / 100) + '% )`\n';
        });

        updatedMessage += '\nPowered by CoinGecko API';

        message.edit(updatedMessage);

    };

}

module.exports.updateMessages = updateMessages;
