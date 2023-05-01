import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Clan = sequelize.define("clan", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coLeader: {
    type: DataTypes.STRING,
  },
});
