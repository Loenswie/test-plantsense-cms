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
        console.log("image");

        const formData = new FormData();
        formData.append('image1', fs.createReadStream(image.path));
        formData.append('latitude', "49.207");
        formData.append('longitude', "16.608");
        formData.append('similar_images', "true");

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Api-Key': process.env.PLANTID_API_KEY
        };

        const response = await axios.post(baseUrl, formData, { headers: headers });

        return response.data;
    }
};
