import { Router } from 'express';
import { createOrder, quoteCart } from '../controllers/commerce.js';
const router = Router();
router.post('/quote', quoteCart);
router.post('/orders', createOrder);
export default router;
