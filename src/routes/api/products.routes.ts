import { Router} from "express";
import { createProduct, getAll, getOneProduct } from "../../Handlers/products";
import { validateToken } from "../../middlewares/Validation";

const productsRoutes = Router();
productsRoutes.get('/', getAll)
productsRoutes.post('/', validateToken ,createProduct)
productsRoutes.get('/:id', getOneProduct)
export default productsRoutes;