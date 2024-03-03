'use strict';

/**
 * sensor-value service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sensor-value.sensor-value');
