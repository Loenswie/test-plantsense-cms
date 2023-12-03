'use strict';

/**
 * plantId-api service
 */

const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const baseUrl = "https://plant.id/api/v3/identification"

module.exports = {

    async fetchDetails(image) {
        try {
            console.log("image");

            const formData = new FormData();
            formData.append('image1', fs.createReadStream(image.path));

            const headers = {
                'Content-Type': 'multipart/form-data',
                'Api-Key': process.env.PLANTID_API_KEY
            };

            const queryParams = {  // can remove some later based on what we need
                'details': 'common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods',
            };

            const response = await axios.post(baseUrl, formData, {
                headers: headers,
                params: queryParams
            });

            return response.data;
        }
        catch (err) {
            strapi.log.error(err);
            throw err;
        }
    }
};
