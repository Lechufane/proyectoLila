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
    const { id } = req.params; //utilizamos el id del jugador que hace la peticion

    const { coLeader } = req.body; //utilizamos el nombre del jugador que queremos que sea co-lider

    if (!id) {
      //si no hay id en la peticion devolvemos un error
      return res.status(400).json({ message: "ID is required" });
    }

    const leader = await Player.findByPk(id); //buscamos al jugador que hace la peticion

    if (!leader.clanId) {
      //si el jugador no tiene clan devolvemos un error porque no puede asignar co-lider a nadie si no tiene clan para empezar.
      return res.status(404).json({ message: "You have no clan yet." });
    }

    const validCoLeader = await Player.findOne({ where: { name: coLeader } }); //Buscamos al jugador que queremos que sea co-lider por su nombre

    if (!validCoLeader) {
      //si no existe el jugador que queremos que sea co-lider devolvemos un error
      return res.status(404).json({ message: "Player not found" });
    }

    try {
      const clan = await Clan.findOne({ where: { leader: leader.name } }); //buscamos el clan del jugador que hace la peticion

      if (!clan) {
        return res.status(404).json({ message: "You are not the leader" }); //si el jugador que hace la peticion no es el lider devolvemos un error
      }

      clan.coLeader = validCoLeader.name; //asignamos el nombre del co-lider al clan
      clan.save();
      validCoLeader.clanId = clan.id; //asignamos el id del clan al co-lider
      validCoLeader.save();

      res.json(clan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
