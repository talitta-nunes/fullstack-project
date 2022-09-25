import "dotenv/config";
import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./data-source";

const init = async () => {
  const PORT = process.env.PORT || 3333;
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log("App is running!");
  });
};
init();
