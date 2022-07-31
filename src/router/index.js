import { productsTest } from "../controller/testController.js";
import { Router } from "express";

const router = Router()

router.get('/products-test', productsTest)

export default router