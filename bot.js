const TelegramBot = require('node-telegram-bot-api');
const token = '982988089:AAHu--kbHd3Cmme4uBA1K7LQ8EPu6JrTs8A';
const bot = new TelegramBot(token, {polling: true});

let date = '98_12_02';
let sp = (date).split('_');
let tarikh = '\u{1F4c5} تاریخ : ' + sp[0] + '/' + sp[1] + '/' + sp[2] + '\n\n';
let id;
id = 118685953;
id = '@filtermarket1';

bot.sendMessage(
  id,
  tarikh +
    '<a href="https://smojmar.github.io/out_' +
    date +
    '/buy_' +
    date +
    '.html">صف های خرید</a> \n\n' +
    '<a href="https://smojmar.github.io/out_' +
    date +
    '/sell_' +
    date +
    '.html">صف های فروش</a> \n\n' +
    '<a href="https://smojmar.github.io/out_' +
    date +
    '/ct_' +
    date +
    '.html">خرید حقوقی</a> \n\n' +
    '<a href="https://smojmar.github.io/out_' +
    date +
    '/floatVal_' +
    date +
    '.html">شناوری سهم ها</a>' +
    '\n\n' +
    '<a href="https://smojmar.github.io/out_' +
    date +
    '/tagh1D_' +
    date +
    '.html">تغییر قیمت تمامی سهم ها</a> \n\n' +
    '<a href="https://smojmar.github.io/out_' +
    date +
    '/rsi_' +
    date +
    '.html">مقادیر RSI برای تمامی سهم ها</a>' +
    '\n\n ' +
    '<a href="https://smojmar.github.io/out_' +
    date +
    '/pe_' +
    date +
    '.html">مقادیر P/E برای سهم و گروه</a>' +
    '\n\n @filtermarket1',

  {parse_mode: 'HTML'},
);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "atever" to the chat
  bot.sendMessage(chatId, chId);
});

// Listen for any kind of meage. There are different kinds of
// messages.
bot.on('message', msg => {
  const chatId = msg.chat.id;

  // send a message to the ct acknowledging receipt of their message
  bot.sendMessage(
    '@filtermarket1',
    '<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href="http://www.example.com/">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>',
    {parse_mode: 'HTML'},
  );
});
