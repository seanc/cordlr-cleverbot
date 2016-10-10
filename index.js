const Cleverbot = require('cleverbot-node');
const chat = new Cleverbot();

function cleverbot(bot, config) {
  config = config[cleverbot.name] || {};
  const scope = config.scope || ['mention', 'command'];
  const mention = config.mention || true;
  const typing = config.typing || true;
  if (scope.includes('mention')) {
    bot.on('message', message => {
      if (message.mentions.users.find('id', bot.user.id)) {
        Cleverbot.prepare(() => {
          const raw = message.cleanContent.split(' ').slice(1);
          if (!raw.length) return;
          chat.write(raw.join(' '), res => {
            if (typing) message.channel.startTyping();
            if (mention) message.reply(res.message)
            else message.channel.sendMessage(res.message);
            message.channel.stopTyping();
          });
        });
      }
    });
  }

  return function run(message, args) {
    if (!scope.includes('command')) return;
    if (args.length < 1) return;
    Cleverbot.prepare(() => {
      chat.write(args.join(' '), res => {
        if (typing) message.channel.startTyping();
        if (mention) message.reply(res.message)
        else message.channel.sendMessage(res.message);
        message.channel.stopTyping();
      });
    });
  }
}

cleverbot.command = 'cleverbot';
cleverbot.usage = 'cleverbot <message>';

module.exports = cleverbot;
