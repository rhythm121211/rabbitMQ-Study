import { connect } from "amqplib";

const connection = await connect("amqp://localhost");
const channel = await connection.createChannel();
const queue = 'task_queue';

await channel.assertQueue(queue, { durable: true });

channel.consume(queue, function(msg) {
    const secs = msg.content.toString().split('.').length - 1;
  
    console.log(" [x] Received %s", msg.content.toString(), secs);
    console.log(" [x] Done");
    // setTimeout(function() {
    // }, secs * 1000);
  }, {
    // automatic acknowledgment mode,
    // see /docs/confirms for details
    noAck: true
  }
);

