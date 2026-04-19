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

      // format price
      let displayPrice = priceNum < 0.0001 
        ? priceNum.toExponential(2) 
        : priceNum.toFixed(6);

      // format % change
      let displayChange = parseFloat(change24h).toFixed(2);

      // emoji logic
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
  }, 600000); // 10 minutes
});

process.on('unhandledRejection', err => console.error(err));
process.on('uncaughtException', err => console.error(err));

client.login(TOKEN);
