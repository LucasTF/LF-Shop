import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import asyncHandler from "./asyncHandler";
import User from "../models/userModel";

interface Token extends jwt.JwtPayload {
  userId: string;
}

export const protect = asyncHandler(async (req: Request, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = <Token>jwt.verify(token, process.env.JWT_SECRET!);
      const user = await User.findById(decodedToken.userId).select("-password");
      if (user) {
        req.user = {
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Acesso não autorizado, token de autenticação inválido.");
    }
  } else {
    res.status(401);
    throw new Error(
      "Acesso não autorizado, token de autenticação não encontrado."
    );
  }
});

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Acesso não autorizado.");
  }
};
