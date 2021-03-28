const { Bot, Keyboard, KeyboardColor } = require('node-vk-bot');
const util = require('util');

const steps = require('./steps');

const bot = new Bot({
    token: 'abe8e0509b749a26067c5445f236d7037e59f2d666060696cf5a3c345331fbeb05943eca794d7103f7e41',
    group_id: 87349535
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
