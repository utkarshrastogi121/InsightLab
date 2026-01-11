import app from "./app";
import { connectMongo } from "./config/db";
import logger from "./utils/logger";

const startServer = async () => {
  await connectMongo();

  app.listen(process.env.PORT, () => {
    logger.info(`Server running on port ${process.env.PORT}`);
  });
};

startServer();
