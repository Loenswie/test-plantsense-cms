// services/mqttHandler.js

const { json } = require("express");

module.exports = {
    handleMqttMessage: async (strapi, message) => {
        try {
            const jsonData = JSON.parse(message);
            const deviceId = jsonData.device_id;
    
            // Query Strapi database to find the plant by device_id
            const plant = await strapi.query('api::plant.plant').findOne({ where: { device_id: deviceId } });
            console.log('Plant:', plant);
            if (plant.device_id != deviceId) {
                console.log('Plant not found:', deviceId);
                return;
            } else {
                if (plant) {
                    console.log('Found plant:', plant);
                    plant.Temperature = parseFloat(jsonData.temperature.toFixed(1));
                    plant.Light = parseFloat(jsonData.light_intensity.toFixed(2));
                    if (jsonData.soil_moisture == 0) {
                        plant.Hydrated = true;
                    }
                    else {
                        plant.Hydrated = false;
                    }
                    console.log('Updated plant:', plant);
                    await strapi.query('api::plant.plant').update({ where: {id: plant.id}, data: {
                        Light: plant.Light,
                        Temperature: plant.Temperature,
                        Hydrated: plant.Hydrated
                    }});
                }
            }
        } catch (error) {
            console.error('Error processing MQTT message:', error);
        }
    },
};
  