import { connect } from 'amqplib';

const connection = await connect("amqp://localhost");
const channel = await connection.createChannel();

const queue = 'task_queue';
const msg = process.argv.slice(2).join(' ') || "Hello World!";

await channel.assertQueue(queue, {
  durable: true
});
await channel.prefetch(1);
channel.sendToQueue(queue, Buffer.from(msg), {
  persistent: true
});
channel.publish('logs', '', Buffer.from('Hello World!'));
console.log(" [x] Sent '%s'", msg);

await channel.close();
await connection.close();

