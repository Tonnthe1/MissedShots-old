import express from 'express';
import { getNetworkConnections, addNetworkConnection, updateUserPreferences } from '../controllers/networkController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, getNetworkConnections);
router.post('/', authMiddleware, addNetworkConnection);
router.put('/preferences', authMiddleware, updateUserPreferences);

export default router;