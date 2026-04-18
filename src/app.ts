import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { apiLimiter } from "./app/middlewares/rateLimiter";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(apiLimiter);

const swaggerDoc = YAML.load("./src/swagger.yaml");

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to the Urban Farming Platform Server...",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/v1", router);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
