const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
};

class PubSub {
  constructor() {
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.publisher.connect();
    this.subscriber.connect();

    this.subscriber.subscribe(CHANNELS.TEST, (message, channel) => {
      this.handleMessage(channel, message);
    });
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);
  }
}

const testPubSub = new PubSub();

setTimeout(() => {
  testPubSub.publisher.publish(CHANNELS.TEST, 'foo');
}, 1000);
