import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import App from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ force: true }); //{ alter: true } para actualizar la base de datos sin borrar los datos
    const script = fs.readFileSync("./database/seed.sql", "utf8"); //leer el sql, y correrlo en un query para rellenar la tabla con los datos.
    await sequelize.query(script);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  App.listen(3000, () => {
    console.log("Express server listening on port 3000");
  });
}

main();
