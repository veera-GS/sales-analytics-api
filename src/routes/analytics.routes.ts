import express from 'express';
import { totalCustomers, totalOrders, averageOrderValue } from '../controllers/analytics.controller';
import { validateQuery } from '../middlewares/validateQuery.middleware';
import { dateRangeSchema } from '../validations/analytics.validation';
import { reqdataValidation } from '../core/requestdatavalidator';

const router:any = express.Router();

router.get('/total-customers',reqdataValidation, validateQuery(dateRangeSchema), totalCustomers);
router.get('/total-orders',reqdataValidation, validateQuery(dateRangeSchema), totalOrders);
router.get('/average-order-value',reqdataValidation, validateQuery(dateRangeSchema), averageOrderValue);

export default router;
