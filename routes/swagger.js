//swagger manual implementation from documentation

swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
require("dotenv").config();
// require('./*.js')
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "MyContacts backend API for CRUDS and Authentication",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        // license: {
        //   name: "MIT",
        //   url: "https://spdx.org/licenses/MIT.html",
        // },
        // contact: {
        //   name: "LogRocket",
        //   url: "https://logrocket.com",
        //   email: "info@email.com",
        // },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

const specs = swaggerJsdoc(options);
//explorer = true , for search bar
module.exports = { swaggerServe: swaggerUi.serve, swaggerSetup: swaggerUi.setup(specs, {explorer: true})}

