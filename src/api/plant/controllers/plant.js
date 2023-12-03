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

        return result;
    },

}));
