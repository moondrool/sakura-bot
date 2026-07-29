# 🌸Sakura Bot

A custom Discord bot built for the **Sakura** community — an anime-themed project on Solana.

The bot was designed to support community engagement by providing live token updates, automated messaging, and server utilities tailored to Sakura's branding and ecosystem.

---

## Features

* Live Sakura token price updates
* Automatic percentage change calculations
* Visual price indicators (gain/loss emojis)
* Dynamic voice channel displaying the current token price
* Automated community announcements
* Easily configurable for future token integrations

---

## Tech Stack

* **Node.js**
* **discord.js**
* JavaScript
* Solana token price APIs
* Railway (deployment)

---

## Project Structure

```text
.
├── index.js
├── package.json
├── config/
├── commands/
├── utils/
└── README.md
```

---

## Installation

```bash
git clone https://github.com/yourusername/sakura-bot.git

cd sakura-bot

npm install
```

Create a `.env` file and add your configuration values:

```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_server_id
PRICE_API_URL=your_price_api
```

Run the bot:

```bash
npm start
```

---

## What I Learned

Building Sakura Bot was an opportunity to work with:

* Discord bot development using `discord.js`
* API integration for live crypto market data
* Scheduled tasks and automated updates
* Community-focused Discord automation
* Deployment and hosting with Railway

---

## Future Improvements

* Slash commands
* Wallet verification
* Token holder role assignment
* Market cap tracking
* Trading volume analytics
* Multi-token support
* On-chain event notifications

---

## License

This project is shared for portfolio purposes.
