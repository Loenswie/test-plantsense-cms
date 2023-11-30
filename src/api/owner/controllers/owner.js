'use strict';

/**
 * owner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const healthService = require('../services/health');

module.exports = createCoreController('api::owner.owner', ({ strapi }) => ({

    async findOne(ctx) {
        
        const result = await super.findOne(ctx);

        const plants = result.data.attributes.plants;

        if (plants) {
            result.data.attributes.plants.data.forEach(plant => {
                const { Hydrated, Light, Temperature } = plant.attributes;
                const healthStatus = healthService.calculateHealth(Hydrated, Light, Temperature);
            
                plant.attributes.Health = healthStatus? 'Good' : 'Bad :(';
            });
        }
    
        return result;
      },
}));
