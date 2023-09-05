// Invocar o leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();

// Habilitar o usuario a acessar o serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função delay 

// Funil 

client.on('message', async msg => {

    if (msg.body.match(/(Eu quero|eu quero|boa noite|boa noite manda o cardápio)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos

        
        await client.sendMessage(msg.from,'E aí ! Tudo bem? Aqui é Pais e filhos lanches, seu mais novo serviço de Delivery 🚲🛵. Sou Jeferson 😆. Vou te mandar nosso cardápio Online 📝, não precisa nem instalar ou se preferir veja nosso catálogo.'); //Primeira mensagem de texto
        let options = '';
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000); //delay de 1 segundo
        await client.sendMessage(msg.from, 'https://pais-e-filhos-lanches.goomer.app/ 📝');
        await delay(3000); //delay de 3 segundos
        await client.sendMessage(msg.from, '👆🏻Ai está nosso app de pedidos, fique a vontade!🤩🤗');
        await delay(4000); //delay de 4 segundo
        await client.sendMessage(msg.from,'https://wa.me/c/5521991378249 📝');

        await delay(5000); //delay de 5 segundo
        await client.sendMessage(msg.from,'👆🏻Esse é o nosso catálogo📝👆🏻');



    }
    
});