import { connect } from 'amqplib';

const connection = await connect("amqp://localhost");
const channel = await connection.createChannel();

const queue = 'messages';
const message = 'Hello World!';

await channel.assertQueue(queue, { durable: false });

// await channel.assertExchange('logs', 'fanout', { durable: false });

// await channel.bindQueue(queue, 'logs', '');

// channel.publish('logs', '', Buffer.from(message));

channel.sendToQueue(queue, Buffer.from(message));
console.log(`Sent: ${message}`);

await channel.close();
await connection.close();
