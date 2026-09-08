import {Router} from 'express';import {getProductById,getProducts} from '../controllers/products.js';const r=Router();r.get('/',getProducts);r.get('/:id',getProductById);export default r;
