import { Router } from "express";
import { PlayerController } from "../controllers/playerController.js";

const router = Router();

router.get("/:id", PlayerController.getPlayer);

router.post("/:id/matchmaking", PlayerController.matchmaking);

router.post("/new", PlayerController.createPlayer);

router.put("/:id/update", PlayerController.updatePlayer);

router.delete("/:id/delete", PlayerController.deletePlayer);

export default router;
