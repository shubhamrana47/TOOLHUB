import express from "express";

import {
  runWebsiteAudit,
} from "../controllers/auditController.js";

const router = express.Router();

router.post(
  "/",
  runWebsiteAudit
);

export default router;