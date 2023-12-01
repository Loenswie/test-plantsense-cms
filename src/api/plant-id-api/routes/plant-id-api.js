'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/detect-plant',
      handler: 'plant-id-api.detectPlant',
      config: {
        payload: {
          maxBytes: 10000000, // set according to image size
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data',
        },
      },
    },
  ],
};
