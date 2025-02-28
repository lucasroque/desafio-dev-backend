import { Router } from 'express';
import stores from './stores';
import transactions from './transactions';
import users from './users';

const router = Router();

router.use(stores);
router.use(transactions);
router.use(users);

export default router;