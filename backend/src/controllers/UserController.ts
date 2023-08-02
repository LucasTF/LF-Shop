import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import Controller from "./Controller";
import User from "../models/userModel";
import asyncHandler from "../middleware/asyncHandler";

export interface UserControllerInterface extends Controller {
  auth: (req: Request, res: Response, next: NextFunction) => void;
  logout: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  profile: (req: Request, res: Response, next: NextFunction) => void;
  updateProfile: (req: Request, res: Response, next: NextFunction) => void;
}

class UserController implements UserControllerInterface {
  // @desc Authenticate user
  // @route POST /api/users/auth
  // @access Public
  auth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user && (await user.matchPasswords(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Email ou senha inválidos");
    }
  });

  // @desc Logout user
  // @route POST /api/users/logout
  // @access Public
  logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Desconectado com sucesso" });
  });

  // @desc Register user
  // @route POST /api/users
  // @access Public
  register = asyncHandler(async (req, res) => {
    res.send("register user");
  });

  // @desc Get authenticated user information
  // @route GET /api/users/profile
  // @access Private
  profile = asyncHandler(async (req, res) => {
    res.send("get user profile");
  });

  // @desc Update user profile
  // @route PUT /api/users/profile
  // @access Private
  updateProfile = asyncHandler(async (req, res) => {
    res.send("update user profile");
  });

  // @desc Get user by id
  // @route GET /api/users/:id
  // @access Private/Admin
  index = asyncHandler(async (req, res) => {
    res.send("get user by id");
  });

  // @desc Get all users
  // @route GET /api/users
  // @access Private/Admin
  indexAll = asyncHandler(async (req, res) => {
    res.send("get all users");
  });

  // @desc Update user by id
  // @route PUT /api/users/:id
  // @access Private/Admin
  update = asyncHandler(async (req, res) => {
    res.send("update user by id");
  });

  // @desc Delete user
  // @route DELETE /api/users/:id
  // @access Private/Admin
  delete = asyncHandler(async (req, res) => {
    res.send("delete user");
  });
}

export default UserController;
