import { Router , Request , Response } from "express";
import { allOrders,createdOrder,OneOrder , addingProduct   } from "../../Handlers/orders";
import { validateToken } from "../../middlewares/Validation";
const ordersRoutes = Router();
ordersRoutes.get('/',validateToken, allOrders)
ordersRoutes.get('/:userId',validateToken,OneOrder)
ordersRoutes.post('/',validateToken,createdOrder)
ordersRoutes.post('/orders/:id/products',validateToken, addingProduct )
export default ordersRoutes;