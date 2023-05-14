const express = require("express");
require("dotenv").config();
const db = require("./models"); // import db from models/index.js
const app = express();
const todo = require("./routes/todo-routes");
const user = require("./routes/user-routes");
const auth = require("./middleware/auth");

const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

app.use(express.json());

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API documentation for my Express.js application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          // the name of the security scheme
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // specify the format of the token, e.g. JWT
        },
      },
    },
    security: [{ bearerAuth: [] }], // specify the security scheme to use
    servers: [
      { url: "http://localhost:3001" }, // Replace with your server URL
    ],
  },
  apis: ["./routes/*.js"], // Replace with the path to your route files
};

// Generate Swagger documentation
const swaggerSpec = swaggerJSDoc(swaggerOptions);
// Serve Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// path
app.use("/todo", auth, todo);
app.use("/user", user);

// connect db
db.sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
