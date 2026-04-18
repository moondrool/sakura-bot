const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.TOKEN;
const PRICE_CHANNEL_ID = '1495126595604578455';
const PAIR_ADDRESS = '9WTHZuyJwCXwxKaunPaowBwv3iFdBGeEuBS9GykLPHmp';

client.once('ready', () => {
  console.log('Sakura Bot is running 🌸');

  setInterval(async () => {
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${PAIR_ADDRESS}`);
      const data = await res.json();

      const pair = data.pair;

      const price = parseFloat(pair.priceUsd).toFixed(4);

      const priceChannel = await client.channels.fetch(PRICE_CHANNEL_ID);

      priceChannel.setName(`🌸 sakura: $${price}`);

    } catch (err) {
      console.error(err);
    }
 }, 900000); // updates every 15 minutes
});

client.login(TOKEN);
