import express, { Request, Response, Router } from "express";

import { processTransactions } from "../controllers/transactions";

const router = Router();

router.post("/processTransactions", express.raw({ type: "text/plain", limit: "5mb" }), async (req: Request, res: Response) => {
  processTransactions(req, res)
});

export default router;