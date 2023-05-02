import { Router } from "express";
import { ClanController } from "../controllers/clanController.js";
import { hashMiddleware } from "../middleware/hashMiddleware.js";
import { isLeaderMiddleware } from "../middleware/isLeaderMiddleware.js";
import { validPassMiddleware } from "../middleware/validPassMiddleware.js";

const router = Router();

router.get("/", ClanController.getClans);

router.get("/:id/players", ClanController.getMembers);

router.get("/:id/leader", ClanController.getLeader);

router.post("/:id/create", hashMiddleware, ClanController.createClan);

router.put("/:id/join", validPassMiddleware, ClanController.joinClan);

router.put("/:id/co-leader", isLeaderMiddleware, ClanController.assignCoLeader);

export default router;
