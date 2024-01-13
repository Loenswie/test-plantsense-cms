'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    console.log('MQTT bootstrap');
    const mqtt = require('mqtt');
    const client = mqtt.connect(process.env.MQTT_HOST);
    const mqttHandler = require('./services/mqttHandler');

    client.on('connect', () => {
      console.log('MQTT connected');
      client.subscribe(process.env.MQTT_TOPIC);
    });

    client.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      mqttHandler.handleMqttMessage(strapi, message.toString());
    });

    client.on('error', (error) => {
      console.error('MQTT error:', error);
    });

    // Cleanup on application shutdown
    process.on('SIGINT', () => {
      console.log('Shutting down MQTT listener');
      client.end();
      process.exit();
    });
  },
};
