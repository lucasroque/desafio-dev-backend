import { Router } from 'express';
import { getUser } from "../controllers/users";

const router = Router();

router.get("/user/:userId", (req, res) => getUser(req, res));

export default router;