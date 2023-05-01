import { Clan } from "../models/Clan.js";
import { Player } from "../models/Player.js";
import pkg from "pg";
import bcrypt, { hash } from "bcrypt";

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export class ClanController {
  static async getMembers(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const player = await Player.findByPk(id);

    try {
      const clan = await Clan.findOne({ where: { id: player.clanId } });

      if (!clan) {
        return res.status(404).json({ message: "Clan not found" });
      }

      const members = await Player.findAll({ where: { clanId: clan.id } });

      res.json(members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createClan(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const clanLeader = await Player.findByPk(id);

    const { name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const clan = await Clan.create({
        name,
        password: hashedPassword,
        leader: clanLeader.name,
      });

      await clanLeader.update({ clanId: clan.id });

      res.json(clan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async joinClan(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const { name, password } = req.body;

    try {
      const member = await Player.findByPk(id);

      const clan = await Clan.findOne({ where: { name: name } });

      if (!member) {
        return res.status(404).json({ message: "Player not found" });
      }

      if (await bcrypt.compare(password, clan.password)) {
        member.clanId = clan.id;
        member.save();
        res.json(member);
      } else {
        return res.status(404).json({ message: "Wrong password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async assignCoLeader(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const leader = await Player.findByPk(id);

    const { coLeader } = req.body;

    const validCoLeader = await Player.findOne({ where: { name: coLeader } });

    if (!validCoLeader) {
      return res.status(404).json({ message: "Player not found" });
    }

    try {
      const clan = await Clan.findOne({ where: { leader: leader.name } });

      if (!clan) {
        return res.status(404).json({ message: "You have no clan yet." });
      }

      clan.coLeader = validCoLeader.name;
      clan.save();
      validCoLeader.clanId = clan.id;
      validCoLeader.save();

      res.json(clan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
