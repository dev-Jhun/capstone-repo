const { createCoreController } = require("@strapi/strapi").factories;

module.exports = {
  async testApi(ctx) {
    ctx.body = "Hello World!";
  },

  async getLatestSensor(ctx) {
    try {
      let myPayload = { data: {}, message: "Successful fetch data" };
      // Updated query to fetch the latest uploaded data
      let myResult = await strapi.db.connection.raw(
        "SELECT * FROM sensor_values ORDER BY created_at DESC LIMIT 1"
      );

      if (myResult) {
        myPayload.data = myResult.rows[0]; // Access the first (latest) element
        ctx.body = myPayload;
        ctx.status = 200;
      }
    } catch (error) {
      ctx.status = 404;
      ctx.body = error.message;
    }
  },
};
