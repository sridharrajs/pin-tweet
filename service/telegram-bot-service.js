const TelegramBot = require('node-telegram-bot-api');

const { TELEGRAM_BOT_TOKEN, TELEGRAM_USER_NAME } = process.env;

const pinboardService = require('./pinboard-service');

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

function listen() {
  bot.on('message', (msg) => {
    const { message_id: originalMessageId, chat: { id: chatId }, from: { username }, entities = [], text } = msg;

    // to restrict the Bot the accept the command
    // from the creator of the Bot
    if (username !== TELEGRAM_USER_NAME) {
      bot.sendMessage(chatId, 'Fork https://github.com/sridharrajs/pin-tweet and create your own Telegram Bot');
      return;
    }

    const links = entities.filter(entity => entity.type === 'url')
    if (links.length > 0) {
      for (const entity of links) {
        const { offset, length } = entity;
        const url = text.slice(offset, offset + length);

        pinboardService.addUrl({
          articleUrl: url,
          title: text
        }).then(() => {
          bot.sendMessage(chatId, `bookmarked ✅`, {
            reply_to_message_id: originalMessageId
          });
        }).catch(() => {
          bot.sendMessage(chatId, 'Failed ❌', {
            reply_to_message_id: originalMessageId
          });
        });

      }
      return;
    }

    bot.sendMessage(chatId, 'No URL found in text');
  });
}

module.exports = { listen }