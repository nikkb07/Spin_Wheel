import { Router } from "express";

import { spinWheel } from "../controllers/spin.controller";

const router = Router();

router.post("/", spinWheel);

export default router;