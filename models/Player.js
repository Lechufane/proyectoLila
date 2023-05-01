import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Clan } from "./Clan.js";

export const Player = sequelize.define(
  "player",
  {
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
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    winrate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    clanId: {
      type: DataTypes.INTEGER,
      references: {
        model: Clan,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
