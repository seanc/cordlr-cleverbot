# cordlr-cleverbot [![NPM version](https://badge.fury.io/js/cordlr-cleverbot.svg)](https://npmjs.org/package/cordlr-cleverbot) [![Build Status](https://travis-ci.org/seanc/cordlr-cleverbot.svg?branch=master)](https://travis-ci.org/seanc/cordlr-cleverbot)

> Cordlr cleverbot plugin

## Installation

```sh
$ cordlr install cordlr-cleverbot
```

Then add it to your config.
```js
{
  "plugins": [
    "cordlr-cleverbot"
  ],
  "cleverbot": {
    "scope": ["mention", "command"], // How should the bot be triggered, by command, message, or both
    "mention": true, // Should the bot mention the user when replying back
    "typing": true // Should the bot act as if it is typing a response
  }
}
```

## Usage
```
cleverbot <message>
```

or it can be used via mention if it is enabled

```
@botname <message>
```

## License

MIT © [Sean Wilson](https://imsean.me)
