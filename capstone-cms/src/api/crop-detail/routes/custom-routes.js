// custom-routes.js

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/sample/test",
            handler: "custom-controller.testApi", // Change to custom-controller
        },
        {
            method: "GET",
            path: "/crop-detailsnew/latest",
            handler: "custom-controller.getLatestDetails", // Change to custom-controller
        },
    ],
};
