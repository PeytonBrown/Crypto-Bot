const fs = require('fs');

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

async function updateCache()
{
    var CoinCache = JSON.parse(fs.readFileSync('./data/CoinCache.json'));

    for (const Coin of CoinCache.UpdateList) {
        var response = null;

            try 
            {
                response = await CoinGeckoClient.coins.fetch(Coin, {});
            } 
            catch (error)
            {
                console.error(error);
                continue;
            }


            if ( response == null || response.success == false)
                continue;

            CoinCache.Coins[Coin] = response.data;

    };

    fs.writeFileSync('./data/CoinCache.json', JSON.stringify(CoinCache));

}

module.exports.updateCache = updateCache;

