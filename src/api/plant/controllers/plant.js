'use strict';

/**
 * plant controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const healthService = require('../services/health');

module.exports = createCoreController('api::plant.plant', ({ strapi }) => ({

    async find(ctx) {
        const data = await super.find(ctx);

        data.data.forEach(plant => {
            const { Hydrated, Light, Temperature } = plant.attributes;
            const healthStatus = healthService.calculateHealth(Hydrated, Light, Temperature);
        
            plant.attributes.Health = healthStatus? 'Good' : 'Bad :(';
        });
    
        return data;
      },
    
}));;
