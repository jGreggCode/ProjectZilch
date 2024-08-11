module.exports = (message, client, handler) => {
    if (message.author.bot) return;

    const msg = message.content;

    const triggers = [
        'hello',
        'hi',
        'whatsup',
        'wazzap',
        'sup',
        'yo',
        'hii',
        'hellow',
        'hi there',
        'yow',
        'whats up',
        'hola'
    ]

    const responses = [
        'Hi there!',
        'Yo!',
        'Hola!',
        'Whatsup human',
        'Uhm hi?',
        'Hey! want me to tell you a story?',
        'Eyo! What\'s vibin\'?',
        'Hello cutie',
        'Hello, you look sad today.',
        'Hi, I think you\'re broken hearted',
        'Sup, you got stories to tell?',
        'Hey, so boring these days, whatchu doin\'?'
    ]

    const repNum = Math.floor(Math.random() * responses.length);

    if (triggers.includes(msg)) {
        message.reply(responses[repNum]);
    }

    if (msg.toLowerCase() === 'g') {
        message.reply('G san yan, inom o laro?');
    }

    if (msg === 'panget') {
        message.reply(`ni <@494469885741760512>!`);
    }
};  