import { Router } from "express";
import { getProducts, updateProduct, deleteProduct } from "../controllers/products.controller";

const router = Router();

router.get('/products', getProducts)
router.put('/products', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router