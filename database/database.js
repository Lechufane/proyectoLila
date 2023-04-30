import Sequelize from "sequelize";

const db = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

export const sequelize = new Sequelize("postgres", "postgres", "mustafa123", {
  host: "localhost",
  dialect: "postgres",
});
