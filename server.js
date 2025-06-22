const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = 3000;

// === Твой Telegram-токен бота ===
const BOT_TOKEN = '7488248522:AAGtzmO5Vq1F-fwhQQKTBvM_71IiOe7skME';

// === Вставь сюда свою текущую ссылку ngrok ===
const NGROK_URL = 'https://e663-91-247-76-6.ngrok-free.app';

// Запускаем Telegram-бота
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Раздаём index.html и статические файлы из текущей папки
app.use(express.static(path.join(__dirname)));

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Привет! Нажми кнопку, чтобы играть 👇', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🎮 Играть!',
            web_app: { url: NGROK_URL }
          }
        ]
      ]
    }
  });
});

// Запускаем локальный сервер
app.listen(PORT, () => {
  console.log(`Game running on http://localhost:${PORT}`);
});
