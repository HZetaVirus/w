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

    if((message.body.toLowerCase() === 'Atendimento'|| message.body === 'Oi'|| message.body === 'oi') && message.from.endsWith('@c.us')) {
        await client.sendMessage(message.from,'E aí! Tudo bem? Aqui é Pais e filhos lanches, seu mais novo serviço de Delivery. Sou Jeferson. Vou te mandar nosso cardápio Online, não precisa nem instalar ou se preferir veja nosso catálogo.');
        let options = '';
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000); //delay de 1 segundo
        await client.sendMessage(msg.from, 'https://pais-e-filhos-lanches.goomer.app/');
        await delay(3000); //delay de 3 segundos
        await client.sendMessage(msg.from, 'Ai está nosso app de pedidos, fique a vontade!');
            
    }
});