import { Router } from "express";
import { ClanController } from "../controllers/clanController";

const router = Router();

router.post("/:id/create", ClanController.createClan);
