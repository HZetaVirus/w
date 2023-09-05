// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia, LocalAuth } = require('whatsapp-web.js'); // Mudança Buttons

const client = new Client();

// entao habilitamos o usuario a acessar o serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certin
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo para fazer a nossa magica =)
client.initialize();

// Enviar Localização

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {

    if (msg.body === 'Oi') {
        const chat = await msg.getChat();
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000); //delay de 1 segundo
        await client.sendMessage(msg.from, 'E aí, aqui, '+ name.split(" ")[0] + ' como posso te ajudar?');
        await delay(3000); //delay de 3 segundos
        await client.sendMessage(msg.from, 'Ótimo, seu nome é ' + name.split(" ")[0]);
        await delay(3000); //delay de 3 segundos
        await client.sendMessage(msg.from, 'Ótimo, seu nome é ' + name.split(" ")[0]);    
    }
});