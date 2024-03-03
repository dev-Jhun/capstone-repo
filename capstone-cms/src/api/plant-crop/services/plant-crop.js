'use strict';

/**
 * plant-crop service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::plant-crop.plant-crop');
