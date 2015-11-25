var amqp = require('amqplib/callback_api');

/*
 * Places msg in queue
 * @param amqp_host {string} - Hostname address
 * @param queue_name {string} - name of the queue to place msg
 * @ msg {Object} - message to enqueue
 */
function push(amqp_host, queue_name, msg) {
	// set up connection
	amqp.connect(amqp_host, function (err, conn) {
		// create channel
		conn.createChannel(function (err, ch) {
			ch.assertQueue(queue_name, {durable: true});
			ch.sendToQueue(queue_name, new Buffer(JSON.stringify(msg)), {persistent: true});
		});
		// close connection and exit
		setTimeout(function () {
			conn.close();
			process.exit(0)
		}, 500);
	});
}

module.exports = push;
