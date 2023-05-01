import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

export const sequelize = new Sequelize(db, user, password, {
  host: "localhost",
  dialect: "postgres",
});
