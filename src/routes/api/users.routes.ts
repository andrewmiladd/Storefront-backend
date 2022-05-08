import { Router , Request , Response } from "express";
import { allUsers , oneUser ,  createdUser ,authenticatedUser} from "../../Handlers/users";
import { validateToken } from "../../middlewares/Validation";
const usersRoutes = Router();
usersRoutes.get('/',validateToken,allUsers )
usersRoutes.get('/:id',validateToken, oneUser)
usersRoutes.post('/', createdUser)
usersRoutes.post('/authenticate' ,validateToken, authenticatedUser)
export default usersRoutes