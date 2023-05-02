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
  static async getLeader(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const clan = await Clan.findByPk(id);

      if (!clan) {
        return res.status(404).json({ message: "Clan not found" });
      }

      const leader = await Player.findOne({ where: { name: clan.leader } });

      res.json(leader);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMembers(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const clan = await Clan.findByPk(id);

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

    try {
      const clan = await Clan.create({
        name,
        password,
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
    const { id } = req.params; //una vez que el middleware isLeaderMiddleware pasa, el id de la request pasa a ser el id del clan
    const { coLeader } = req.body; //utilizamos el nombre del jugador que queremos que sea co-lider

    try {
      const clan = await Clan.findByPk(id); //buscamos el clan por su id
      const validCoLeader = await Player.findOne({ where: { name: coLeader } }); //Buscamos al jugador que queremos que sea co-lider por su nombre
      if (!validCoLeader) {
        return res.status(404).json({ message: "Player not found" });
      }

      clan.coLeader = validCoLeader.name; //asignamos el nombre del co-lider al clan
      validCoLeader.clanId = clan.id; //asignamos el id del clan al co-lider
      clan.save();
      validCoLeader.save();

      res.json(clan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
