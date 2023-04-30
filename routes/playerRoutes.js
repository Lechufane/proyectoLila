import { Router } from "express";
import { getPlayer } from "../controllers/playerController.js";

const router = Router();

router.get("/:id", getPlayer);

router.post("/", (req, res) => {
  res.send("Hello World!");
});

router.put("/", (req, res) => {
  res.send("Hello World!");
});

router.delete("/", (req, res) => {
  res.send("Hello World!");
});

router.patch("/", (req, res) => {
  res.send("Hello World!");
});

export default router;
