import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoute from "./routes/health.route";
import { rateLimiter } from "./middlewares/rateLimiter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(morgan("dev"));

app.use("/api", healthRoute);

export default app;
