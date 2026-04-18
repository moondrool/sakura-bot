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

      // 🔒 safety check
      if (!data || !data.pair || !data.pair.priceUsd) {
        console.log('Invalid data received, skipping...');
        return;
      }

      const price = parseFloat(data.pair.priceUsd).toFixed(4);

      // only update if price changed
      if (price !== lastPrice) {
        const priceChannel = await client.channels.fetch(PRICE_CHANNEL_ID);

        if (!priceChannel) {
          console.log('Channel not found');
          return;
        }

        await priceChannel.setName(`🌸 sakura: $${price}`);
        lastPrice = price;

        console.log(`Updated price: $${price}`);
      }

    } catch (err) {
      console.error('Error caught:', err.message);
      // 👇 IMPORTANT: don't crash
    }
  }, 600000); // 10 minutes
});

// 🔒 global crash protection
process.on('unhandledRejection', err => {
  console.error('Unhandled rejection:', err);
});

process.on('uncaughtException', err => {
  console.error('Uncaught exception:', err);
});

client.login(TOKEN);
