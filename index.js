const Cleverbot = require('cleverbot-node');
const chat = new Cleverbot();

function cleverbot(bot, config) {
  if (config.cleverbot.scope.indexOf('mention') > -1) {
    bot.on('message', message => {
      if (message.mentions.users.find('id', bot.user.id)) {
        Cleverbot.prepare(() => {
          const raw = message.cleanContent.split(' ').slice(1);
          if (!raw.length) return;
          chat.write(raw.join(' '), res => {
            if (config.cleverbot.typing) message.channel.startTyping();
            if (config.cleverbot.mention) message.reply(res.message)
            else message.channel.sendMessage(res.message);
            message.channel.stopTyping();
          });
        });
      }
    });
  }

  return function run(message, args) {
    if (!config.cleverbot.scope.indexOf('command') > -1) return;
    if (args.length < 1) return;
    Cleverbot.prepare(() => {
      chat.write(args.join(' '), res => {
        if (config.cleverbot.typing) message.channel.startTyping();
        if (config.cleverbot.mention) message.reply(res.message)
        else message.channel.sendMessage(res.message);
        message.channel.stopTyping();
      });
    });
  }
}

cleverbot.command = 'cleverbot';
cleverbot.usage = 'cleverbot <message>';

module.exports = cleverbot;
