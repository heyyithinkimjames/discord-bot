require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// ----------------------
// Basic Express web server (keeps bot alive on Render)
const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));

// Use the PORT Render provides, fallback to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Web server running on port ${PORT}`));

// ----------------------
// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ----------------------
// Log when bot is ready
client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// ----------------------
// Basic command example
client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

// ----------------------
// Login to Discord using environment variable
// Make sure on Render you named it "DISCORD_TOKEN"
client.login(process.env.DISCORD_TOKEN);
