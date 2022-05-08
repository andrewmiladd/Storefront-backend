import Express, { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const bearer = authHeader.split(" ")[0].toLocaleLowerCase();
      const token = authHeader.split(" ")[1];
      if (token && bearer === "bearer") {
        const decode = jwt.verify(token, TOKEN_SECRET as unknown as string);
        if (decode) {
          next();
        } else {
          res.json({ message: "error" });
        }
      }
    } else {
      res.status(401);
      res.json({
        message: "token is needed",
      });
    }
  } catch (error) {
    throw new Error(`error! ${error}`);
  }
};
