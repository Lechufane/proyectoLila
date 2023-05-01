import { Clan } from "../models/Clan.js";
import { Player } from "../models/Player.js";
import pkg from "pg";
import bcrypt from "bcrypt";

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export class ClanController {
  _hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  async createClan(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const { name, password, coLeader } = req.body;

    const hashedPassword = this._hashPassword(password);
    const clanLeader = await Player.findByPk(id);

    try {
      const clan = await Clan.create({
        name,
        password: hashedPassword,
        leader: clanLeader.name,
        coLeader,
      });
      res.json(clan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
