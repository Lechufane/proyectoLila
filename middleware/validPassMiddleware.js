import bcrypt from "bcrypt";
import { Clan } from "../models/Clan.js";

export async function validPassMiddleware(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const { name, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const clan = await Clan.findOne({ where: { name } });

    if (!clan) {
      return res.status(404).json({ message: "Clan not found" });
    }

    const validPass = await bcrypt.compare(password, clan.password);

    if (!validPass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
