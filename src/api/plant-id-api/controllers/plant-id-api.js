'use strict';

/**
 * A set of functions called "actions" for `plantId-api`
 */

module.exports = {

  async detectPlant(ctx) {
    try {

      const image = ctx.request.files?.image;

      if (!image) {
        return ctx.badRequest('No image provided');
      }

      const result = await strapi
        .service('api::plant-id-api.plant-id-api')
        .fetchDetails(image);

      ctx.body = result;

    }
    catch (err) {
      strapi.log.error(err);
      ctx.badRequest('Error processing the image');
    }
  }
};
