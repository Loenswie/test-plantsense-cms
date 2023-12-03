'use strict';

/**
 * plant health service
 */


// the following values should be loaded for each specific plant to fit their needs
const MIN_LIGHT_LEVEL = 0.4;
const MAX_LIGHT_LEVEL = 0.9;
const MIN_TEMPERATURE = 10;
const MAX_TEMPERATURE = 30;


module.exports = {
    calculateHealth,
    getAdvice
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

function hydrated(Hydrated) {
    return Hydrated;
}


function goodLightLevel(LightLevel) {
    return LightLevel > MIN_LIGHT_LEVEL && LightLevel < MAX_LIGHT_LEVEL;
}


function goodTemperature(Temperature) {
    return Temperature > MIN_TEMPERATURE && Temperature < MAX_TEMPERATURE;
}