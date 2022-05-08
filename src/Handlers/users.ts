import Express ,{ Request, Response,NextFunction } from "express";
import { User,  userStore} from "../Models/users.model";
import  jwt  from "jsonwebtoken";
import dotenv, { config } from 'dotenv'

dotenv.config();
const {TOKEN_SECRET} = process.env;

const getAllUsers = new userStore();
 export const allUsers = async (_req:Request,res:Response,next:NextFunction)=>{
      try{
      const users = await getAllUsers.showAll();
      res.json(users)
    } catch(err){
        next(err)
       
      }
}
const getOneUser = new userStore();
export const oneUser = async (req:Request,res:Response,next:NextFunction)=>{
  try{
  const user = await getOneUser.getOne(req.params.id)

  res.json(user) 
  }catch(err){
      next();
  }
}

const CreateUser = new userStore();
export const createdUser = async (req:Request,res:Response,next:NextFunction) => {
        const user:User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email:req.body.email,
        password: req.body.password
        };
      try{
      const newUser = await CreateUser.createOne(user);
      const token = jwt.sign({user:newUser} , TOKEN_SECRET as unknown as string)
      
      return res.json({
        data:{...newUser , token},
        message:'user authenticated'
      })
    }catch(err){
      next(err)
    }
} 

const authenticated = new userStore();
export const authenticatedUser = async (req:Request,res:Response , next:NextFunction) => {
  try {
    
    const {email , password} = req.body; 
    const authentication = await authenticated.authenticate(email , password)
    const token = jwt.sign({ authentication } , TOKEN_SECRET as unknown as string)
    if (!authentication){
        return res.json({
          message: "wrong username or password!"
        })
    } 
    next();
    return res.json({
        data:{...authentication , token},
        message:'user authenticated'
      })
  } catch (error) {
    return next(error)
  }   
} 