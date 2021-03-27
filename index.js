const { Bot, Keyboard, KeyboardColor } = require('node-vk-bot');
const util = require('util');

const steps = require('./steps');

const bot = new Bot({
    token: 'your token',
    group_id: group_id_number
}).start();

console.log('Bot started!');

bot.get(/./i, (message, exec, reply) => {
    let info = message.payload && steps[JSON.parse(message.payload)] || steps[''];
    let keyboard = new Keyboard(true);

    for (let i = 0; i < info.btns.length; i++) {
        if (i) keyboard.addRow();

        const btn = info.btns[i];

        keyboard.addButton(btn.msg, KeyboardColor.PRIMARY, JSON.stringify(btn.next));
    }
    
    reply(info.question, {keyboard}).catch(e => console.error(e));
})

bot.on('poll-error', error => {
    console.error('error occurred on a working with the Long Poll server ' +
        `(${util.inspect(error, false, 8, true)})`)
})
