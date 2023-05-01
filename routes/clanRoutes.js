import { Router } from "express";
import { ClanController } from "../controllers/clanController.js";

const router = Router();

router.post("/:id/create", ClanController.createClan);

export default router;
