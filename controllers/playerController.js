import { Player } from "../models/Player.js";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export class PlayerController {
  static async getPlayer(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "ID is required" });

    try {
      const player = await Player.findByPk(id);
      res.status(200).json(player);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async createPlayer(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      const player = await Player.create({
        name,
        level: 0,
        rank: 0,
        winrate: 0,
      });
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePlayer(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const { name, level, rank, winrate } = req.body;

    try {
      const player = await Player.findByPk(id);

      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      player.name = name || player.name;
      player.level = level || player.level;
      player.rank = rank || player.rank;
      player.winrate = winrate || player.winrate;

      await player.save();

      res.status(200).json(player);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deletePlayer(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const player = await Player.findByPk(id);

      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      await player.destroy();

      res.status(200).json({ message: "Player deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async matchmaking(req, res) {
    const { id } = req.params;

    try {
      const player = await Player.findByPk(id);

      const { rank, level, winrate } = player;

      const query = {
        text: `SELECT * FROM players WHERE rank = $1 OR level = $2 OR winrate = $3 ORDER BY rank DESC, level DESC, winrate DESC LIMIT 10;`,
        values: [rank, level, winrate],
      };
      const { rows } = await pool.query(query);

      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
