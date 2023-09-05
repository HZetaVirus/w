const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

const delay = ms => new Promise(res => setTimeout(res, ms));

const menu = {
  '1': { name: 'Pizza de Calabresa', price: 30.0 },
  '2': { name: 'Pizza de Mussarela', price: 25.0 },
  '3': { name: 'Pizza de Frango com Catupiry', price: 35.0 },
  '4': { name: 'Refrigerante 2L', price: 8.0 },
  '5': { name: 'Suco de Laranja 500ml', price: 5.0 },
};

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Cliente pronto!');

  client.on('message', async (message) => {
    if ((message.body.toLowerCase() === 'Atendimento'|| message.body === 'Oi'|| message.body === 'oi') && message.from.endsWith('@c.us')) {
      await client.sendMessage(message.from,'Olá! Tudo bem? Aqui é a Pizzaria do Jardel. Vou te mandar nosso cardápio.');
      let options = '';
      for (const [key, value] of Object.entries(menu)) {
        options += `${key}. ${value.name} - R$${value.price}\n`;
      }
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`Cardápio de opções:\n${options}\nDigite o número da opção desejada.`);
    } else if (Object.keys(menu).includes(message.body) && !message.fromMe) {
      const selectedOption = menu[message.body];
      if (!client.order) {
        client.order = {
          items: [],
          totalPrice: 0.0,
          customerAddress: '',
        };
      }
      client.order.items.push(selectedOption);
      client.order.totalPrice += selectedOption.price;
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`Obrigado! Você escolheu ${selectedOption.name}. O valor atual do seu pedido é de R$${client.order.totalPrice}.`);
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,'Digite o número da próxima opção desejada ou envie "finalizar" para concluir o pedido.');
    } else if (message.body.toLowerCase() === 'finalizar' && !message.fromMe) {
      if (!client.order || client.order.items.length === 0) {
        await delay(3000); //Delay de 3 segundos

        await client.sendMessage(message.from,'Seu pedido está vazio. Por favor, escolha uma opção do cardápio.');
        return;
      }
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`Seu pedido contém:`);
      let orderSummary = '';
      for (const item of client.order.items) {
        orderSummary += `${item.name} - R$${item.price}\n`;
      }
      await message.reply(orderSummary);
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`O valor total do seu pedido é de R$${client.order.totalPrice}.`);
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,'Por favor, me informe seu endereço completo e número da casa:');
    } else if (client.order && !message.fromMe) {
      // Recebe o endereço do cliente e confirma o pedido
      client.order.customerAddress = message.body;
      const order = client.order;
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`Obrigado! Seu pedido será entregue em ${order.customerAddress}.`);
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,'Para pagamento, aceitamos PIX, cartão de crédito e dinheiro. Obrigado! Agora é só aguardar seu pedido!');
      // Reseta o pedido do cliente
      client.order = null;
    }
  });

});
client.initialize();