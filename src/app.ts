import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

const swaggerDoc = YAML.load("./src/swagger.yaml");

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to the Urban Farming Platform Server...",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/v1", router);

export default app;
