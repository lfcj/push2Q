#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// open connection
function receive(host, queue, cb) {
	amqp.connect(host, function (err, conn) {
		// decalre queue from which to consume
		conn.createChannel(function (err, ch) {
			// make sure queue exists.
			ch.assertQueue(queue, {durable: true});
			// consume, but waiting one seconds for every dot in the msg.
			console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
			ch.consume(queue, function (msg) {
				//console.log(msg);
				if (msg!=undefined){
					ch.ack(msg);
					cb(JSON.parse(msg.content.toString()));
				}

			}, {noAck: false});
		});
	});
}

module.exports = receive;

