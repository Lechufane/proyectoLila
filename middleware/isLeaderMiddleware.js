import { Player } from "../models/Player.js";
import { Clan } from "../models/Clan.js";

export const isLeaderMiddleware = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const leader = await Player.findByPk(id);

  if (!leader) {
    return res.status(404).json({ message: "Player not found" });
  }

  if (!leader.clanId) {
    return res.status(401).json({ message: "You are not in a clan" });
  }

  const clan = await Clan.findByPk(leader.clanId);

  if (clan.leader !== leader.name) {
    return res
      .status(401)
      .json({ message: "You are not the leader of this clan" });
  }

  req.params.id = leader.clanId;

  next();
};
