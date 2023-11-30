'use strict';

/**
 * plant health service
 */

module.exports = {
    calculateHealth(Hydrated, Light, Temperature) {
        return hydrated(Hydrated) && goodLightLevel(Light) && goodTemperature(Temperature);
    }
}


function hydrated(Hydrated) {
    return Hydrated;
}


function goodLightLevel(LightLevel) {
    return LightLevel > 0.4 && LightLevel < 0.9;
}


function goodTemperature(Temperature) {
    return Temperature > 10 && Temperature < 30;
}