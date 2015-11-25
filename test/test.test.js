
var push2Q = require('../push2Q');
var receiver = require('../worker');
var host = 'amqp://localhost';
var queue = 'task_queue';
var expect = require('chai').expect;
var message = {
	name: 'Hi, I am a test',
	id: 12345,
	keys: ['test1', 'test2', 'test3'],
	things: {a: 1, b: 2}
};
/**************************************************************
Every test can only run alone, because the receive gets ALL the messages,
 thus also getting the ones pushed for others tests.


Uncomment the test you want
 **************************************************************/

describe('worker should receive what push2Q sends', function () {
	it('should have same object sent and received ', function (done) {
		push2Q(host, queue, message);

		receiver(host, queue, function (data) {
			expect(data).to.not.equal(undefined);
			expect(data.name).to.equal(message.name);
			expect(data.id).to.equal(message.id);
			expect(data.keys[0]).to.equal(message.keys[0]);
			expect(data.keys[1]).to.equal(message.keys[1]);
			expect(data.keys[2]).to.equal(message.keys[2]);
			expect(data.things.a).to.equal(message.things.a);
			expect(data.things.b).to.equal(message.things.b);
			done();
		});
	});
});

//describe('worker should receive what push2Q sends', function () {
//	it('should have same object sent and received ', function (done) {
//		push2Q(host, queue, {});
//
//		receiver(host, queue, function (data) {
//			expect(data).to.not.equal(undefined);
//			expect(Object.keys(data).length).to.equal(Object.keys({}).length);
//			done();
//		});
//	});
//});
