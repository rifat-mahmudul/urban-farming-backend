import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to the Urban Farming Platform Server...",
  });
});

app.use("/api/v1", router);

export default app;
