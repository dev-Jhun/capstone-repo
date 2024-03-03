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
            path: "/plant-crops/latest",
            handler: "custom-controller.getLatestCrop", // Change to custom-controller
        },
    ],
};
