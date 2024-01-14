'use strict';

/**
 * plant controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::plant.plant', ({ strapi }) => ({

    async findOne(ctx) {

        const result = await super.findOne(ctx);
        const details = ctx.query.details ? ctx.query.details.split(',') : [];

        result.data = strapi.services['api::plant.plant'].addDetailsToPlants([result.data], details);
        result.data = strapi.services['api::plant.plant'].addStreakToPlants(result.data);

        return result;
    },

    async find(ctx) {

        const result = await super.find(ctx);

        

        const deviceFilter = ctx.query.device_id ? ctx.query.device_id : null;

        if (deviceFilter) {
            const filteredResult = result.data.filter(plant => plant.attributes.device_id === deviceFilter);
            result.data = filteredResult;
        }

        result.data = strapi.services['api::plant.plant'].addStreakToPlants(result.data);
        
        return result;
    },

}));
