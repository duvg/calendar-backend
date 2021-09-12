const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./db/config");

// Swagger
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./docs/swaggerOptions");

// Express server app
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public folder
app.use(express.static("public"));

// Serialize and unserialize body request
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// TODO: CRUD: Events

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Listen request
app.listen(process.env.PORT, () => {
  console.log(`Server running in http://localhost:${process.env.PORT}`);
});
