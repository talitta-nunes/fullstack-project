import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {AppError} from "../errors/AppError";

export const handleAuthUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token não encontrado", 404);
  }

  const splitToken = token.split(" ");

  jwt.verify(
    splitToken[1],
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError("Token inválido", 401);
      }

      req.user = {
        id: decoded.id,
      };

      next();
    }
  );
};

