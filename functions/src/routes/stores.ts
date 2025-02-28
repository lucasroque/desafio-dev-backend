import { Router } from "express";

import { cleanStores, getStores, getStoresByDocument } from "../controllers/stores";

const router = Router();

router.get("/stores", (req, res) => getStores(req, res));
router.get("/storesByDocument/:document", (req, res) => getStoresByDocument(req, res));
router.delete("/cleanStores", (req, res) => cleanStores(req, res));

export default router;