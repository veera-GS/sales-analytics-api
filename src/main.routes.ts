import express from 'express';
const router:any = express.Router();


import refreshRoutes from './routes/refresh.routes'
import analyticsRoutes from './routes/analytics.routes';

router.use('/analytics', analyticsRoutes);
router.use( refreshRoutes);

export default router