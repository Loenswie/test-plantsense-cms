'use strict';

/**
 * owner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::owner.owner', ({ strapi }) => ({

    async findOne(ctx) {

        const result = await super.findOne(ctx);

        const plants = result.data.attributes.plants ? result.data.attributes.plants.data : [];

        if (plants.length > 0) {
            const details = ctx.query.details ? ctx.query.details.split(',') : [];

            const plantsWithDetails = strapi.services['api::plant.plant'].addDetailsToPlants(plants, details);
            result.data.attributes.plants.data = plantsWithDetails;
        }

        return result;
    },
}));
