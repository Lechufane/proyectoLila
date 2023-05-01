import dotenv from "dotenv";
dotenv.config();
import App from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ alter: true }); //{ alter: true } to update the database schema without losing any data
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  App.listen(3000, () => {
    console.log("Express server listening on port 3000");
  });
}

main();
