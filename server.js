const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '7488248522:AAGtzmO5Vq1F-fwhQQKTBvM_71IiOe7skME';
const WEB_APP_URL = 'https://telegram-game-5beu.onrender.com'; // твой рендер URL

const bot = new TelegramBot(BOT_TOKEN);

app.use(express.json()); // для webhook нужны json body

// Обработка webhook от Telegram
app.post('/bot', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Устанавливаем webhook на Telegram
bot.setWebHook(`${WEB_APP_URL}/bot`);

// Раздаём статику
app.use(express.static(path.join(__dirname)));

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Нажми кнопку, чтобы играть 👇', {
    reply_markup: {
      inline_keyboard: [[{ text: '🎮 Играть!', web_app: { url: WEB_APP_URL } }]],
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
