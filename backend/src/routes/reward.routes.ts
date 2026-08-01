import { Router } from "express";

import {
  getRewards,
  getWheel,
} from "../controllers/reward.controller";

const router = Router();

router.get("/", getRewards);

router.get("/wheel", getWheel);

export default router;