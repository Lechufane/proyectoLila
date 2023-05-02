import { Router } from "express";
import { PlayerController } from "../controllers/playerController.js";
import { checkApiKey } from "../middleware/updateMiddleware.js";

const router = Router();

router.get("/:id", PlayerController.getPlayer);

router.post("/:id/matchmaking", PlayerController.matchmaking);

router.post("/new", PlayerController.createPlayer);

router.put("/:id/update", checkApiKey, PlayerController.updatePlayer);

router.delete("/:id/delete", checkApiKey, PlayerController.deletePlayer);

export default router;
