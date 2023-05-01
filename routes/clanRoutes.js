import { Router } from "express";
import { ClanController } from "../controllers/clanController.js";

const router = Router();

router.get("/:id/players", ClanController.getMembers);

router.post("/:id/create", ClanController.createClan);

router.put("/:id/join", ClanController.joinClan);

router.put("/:id/co-leader", ClanController.assignCoLeader);

export default router;
