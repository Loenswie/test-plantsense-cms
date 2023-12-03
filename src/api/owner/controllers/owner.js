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
        const details = ctx.query.details ? ctx.query.details.split(',') : [];

        if (plants) {
            result.data.attributes.plants.data.forEach(plant => {

                const { Hydrated, Light, Temperature } = plant.attributes;
                
                if (details.includes('health')) {
                    const healthStatus = healthService.calculateHealth(Hydrated, Light, Temperature);
                    plant.attributes.Health = healthStatus ? 'Good' : 'Bad :(';
                }
                if (details.includes('advice')) {
                    const advice = healthService.getAdvice(Hydrated, Light, Temperature);
                    plant.attributes.Advice = advice;
                }
            });
        }

        return result;
    },
}));
