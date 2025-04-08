import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SaSske Tracker API",
            version: "1.0.0",
            description: "API for trackingtime spent on websites",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
            },
        ],
    },
    apis: ["src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
