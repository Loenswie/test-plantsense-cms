'use strict';

/**
 * plant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::plant.plant', ({ strapi }) => ({
    addDetailsToPlants
}));

// the following values should be loaded for each specific plant to fit their needs
const MIN_LIGHT_LEVEL = 0.4;
const MAX_LIGHT_LEVEL = 0.9;
const MIN_TEMPERATURE = 10;
const MAX_TEMPERATURE = 30;


function addDetailsToPlants(plants, details) {
    if (plants) {
        plants.forEach(plant => {
            
            const { Hydrated, Light, Temperature } = plant.attributes;
            
            if (details.includes('health')) {
                const healthStatus = calculateHealth(Hydrated, Light, Temperature);
                plant.attributes.Health = healthStatus ? 'Good' : 'Bad :(';
            }
            if (details.includes('advice')) {
                const advice = getAdvice(Hydrated, Light, Temperature);
                plant.attributes.Advice = advice;
            }
            if (details.includes('thresholds')) {
                const thresholds = getThresholds();
                plant.attributes.thresholds = thresholds;
            }
        });
    }
    return plants
}

function calculateHealth(Hydrated, Light, Temperature) {
    return hydrated(Hydrated) && goodLightLevel(Light) && goodTemperature(Temperature);
}

function getAdvice(Hydrated, Light, Temperature) {
    const advice = {
        hydrated: null,
        light: null,
        temperature: null
    };

    if (!hydrated(Hydrated)) {
        advice.hydrated = 'Your plant needs water';
    }
    if (Light < MIN_LIGHT_LEVEL) {
        advice.light = 'Your plant needs more light';
    }
    if (Light > MAX_LIGHT_LEVEL) {
        advice.light = 'Your plant needs less light';
    }
    if (Temperature < MIN_TEMPERATURE) {
        advice.temperature = 'Your plant is too cold';
    }
    if (Temperature > MAX_TEMPERATURE) {
        advice.temperature = 'Your plant is too hot';
    }
    return advice
}

function getThresholds() {  // todo: this should be loaded from a database
    return {
        light: {
            min: MIN_LIGHT_LEVEL,
            max: MAX_LIGHT_LEVEL
        },
        temperature: {
            min: MIN_TEMPERATURE,
            max: MAX_TEMPERATURE
        }
    }
}

function hydrated(Hydrated) {
    return Hydrated;
}


function goodLightLevel(LightLevel) {
    return LightLevel > MIN_LIGHT_LEVEL && LightLevel < MAX_LIGHT_LEVEL;
}


function goodTemperature(Temperature) {
    return Temperature > MIN_TEMPERATURE && Temperature < MAX_TEMPERATURE;
}