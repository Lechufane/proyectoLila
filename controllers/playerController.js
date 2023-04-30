import { Player } from "../models/Player.js";

export const getPlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findByPk(id);
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
