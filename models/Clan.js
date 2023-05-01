import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Player } from "./Player.js";

const defineClan = (sequelize) => {
  const Clan = sequelize.define("clan", {
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coLeader: {
      type: DataTypes.INTEGER,
    },
  });

  return Clan;
};

const Clan = defineClan(sequelize);

export default Clan;
