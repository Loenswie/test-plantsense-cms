'use strict';

/**
 * owner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::owner.owner', ({ strapi }) => ({

    async findOne(ctx) {

        const result = await super.findOne(ctx);

        const plants = result.data.attributes.plants.data;
        const details = ctx.query.details ? ctx.query.details.split(',') : [];

        result.data.attributes.plants.data = strapi.services['api::plant.plant'].addDetailsToPlants(plants, details);

        return result;
    },
}));
