require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Basic express web server (keeps bot alive on Render)
const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000, () => console.log('🌐 Web server running...'));

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Log when bot is ready
client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Basic command example
client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

// Login to Discord
client.login(process.env.TOKEN);
