// import { config } from "dotenv";
import { config } from "./config/config.js";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import compression from "compression";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

import __dirname from "./utils.js";

const app = express();
// config({ path: __dirname + "/.env" });

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "AdoptMe API",
      description: "API para la gestión de adopciones de mascotas",
      version: "1.0.0",
    },
  },
//   apis: [`${__dirname}/docs/*.yaml`],
    apis: ["./src/docs/*.yaml"],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = config.PORT || 8080;
const connection = mongoose.connect(config.MONGO_URL);

app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
