import express from "express";
import cors from "cors";

import routes from "./routes";
import { notFound } from "./middleware/notFound.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorMiddleware);

export default app;