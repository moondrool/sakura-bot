const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.TOKEN;
const PRICE_CHANNEL_ID = '1495126595604578455';
const PAIR_ADDRESS = '9WTHZuyJwCXwxKaunPaowBwv3iFdBGeEuBS9GykLPHmp';

let lastPrice = null;

client.once('ready', () => {
  console.log('Sakura Bot is running 🌸');

  setInterval(async () => {
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${PAIR_ADDRESS}`);
      const data = await res.json();

      if (!data || !data.pair) {
        console.log('Invalid data, skipping...');
        return;
      }

      const pair = data.pair;

      let priceNum = parseFloat(pair.priceUsd);
      let change24h = pair.priceChange?.h24 || 0;

     let displayPrice = priceNum.toFixed(7).replace(/\.?0+$/, '');

      let displayChange = parseFloat(change24h).toFixed(2);

      let emoji = '⚪';
      if (change24h > 0) emoji = '🟢';
      else if (change24h < 0) emoji = '🔴';

      const priceChannel = await client.channels.fetch(PRICE_CHANNEL_ID);

      if (!priceChannel) {
        console.log('Channel not found');
        return;
      }

      await priceChannel.setName(
        `${emoji} sakura: $${displayPrice} (${change24h >= 0 ? '+' : ''}${displayChange}%)`
      );

      lastPrice = priceNum;

      console.log(`Updated: ${emoji} $${displayPrice} (${displayChange}%)`);

    } catch (err) {
      console.error('Error:', err.message);
    }
  }, 600000);
});

process.on('unhandledRejection', err => console.error(err));
process.on('uncaughtException', err => console.error(err));

client.login(TOKEN);
