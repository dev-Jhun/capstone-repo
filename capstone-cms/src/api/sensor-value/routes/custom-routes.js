// custom-routes.js

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/test",
            handler: "custom-controller.testApi", // Change to custom-controller
        },
        {
            method: "GET",
            path: "/sensor-values/latest",
            handler: "custom-controller.getLatestSensor", // Change to custom-controller
        },
    ],
};
