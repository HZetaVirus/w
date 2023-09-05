// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
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

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil Base Projeto

client.on('message', async msg => {

    if (msg.body.match(/(ativar|ativar funil|informação|eu quero|como funciona|funciona|teste|interessado|informações|mais informações|Imagens|videos|audios|teste)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(5000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! '+ name.split(" ")[0] + ', Seja muito bem vindo. Você entrou no Funil Basico do treinamento Chatbot projetado pelo Jardel'); //Primeira mensagem de texto
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //delay de 3 segundos
        await client.sendMessage(msg.from, 'Você vai ter contato com as funcionalidades básicas do nosso projeto e poderá ver o quanto é fácil criar seus próprios funis personalizados.');
        await delay(3000); //delay de 3 segundos
        
    
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3 segundos
        await client.sendMessage(msg.from, 'Agora eu vou te mandar um audio gravado mas enviado como se fosse fresquinho!!');
        await delay(5000); //Delay de 5 segundos
        await chat.sendStateRecording(); //Simulando audio gravando
        await delay(5000); //Delay de 5 segundos
        const formal1 = MessageMedia.fromFilePath('./audio_base.ogg'); // Arquivo de audio em ogg gravado, pode ser .opus também
        await client.sendMessage(msg.from, formal1, {sendAudioAsVoice: true}); // enviando o audio1

        const formal2 = MessageMedia.fromFilePath('./audio_base.ogg'); // Arquivo de audio em ogg gravado, pode ser .opus também
        await client.sendMessage(msg.from, formal2, {sendAudioAsVoice: true}); // enviando o audio1

        await delay(4000); //Delay de 4 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from, 'Agora quero te mandar uma imagem');
        await delay(3000); //Delay de 3 segundos
        const img1 = MessageMedia.fromFilePath('./imagem_base.png'); // arquivo em imagem, ´pode ser jpeg também
        await client.sendMessage(msg.from, img1, {caption: 'Aqui é a legenda'}); //Enviando a imagem

        const img2 = MessageMedia.fromFilePath('./imagem_base.png'); // arquivo em imagem, ´pode ser jpeg também
        await client.sendMessage(msg.from, img2, {caption: 'Aqui é a legenda'}); //Enviando a imagem



        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from, 'Agora quero te mandar um pdf');

        const doc1 = MessageMedia.fromFilePath('./Pdf_1.pdf'); // pdf para ser enviado
        await client.sendMessage(msg.from, doc1); //Enviando o pdf


        await client.sendMessage(msg.from, 'Prontinho! Agora use a sua criatividade para criar sequencias de respostas com textos, audios, imagens... O céu é o limite');
    

   
    



    }
    
});