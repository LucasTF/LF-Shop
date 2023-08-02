import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import Controller from "./Controller";
import User from "../models/userModel";
import asyncHandler from "../middleware/asyncHandler";
import UserValidationService from "../services/UserValidationService";

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

  protected _userValidationService = new UserValidationService();

  auth = asyncHandler(async (req, res) => {
    const { email, password } = this._userValidationService.validateAuth(req);

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

      res.status(200).json({
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
    const { name, email, password } =
      this._userValidationService.validateRegister(req);

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Usuário já existe");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Dados de usuário inválidos");
    }
  });

  // @desc Get authenticated user information
  // @route GET /api/users/profile
  // @access Private
  profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user!._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("Usuário não encontrado");
    }
  });

  // @desc Update user profile
  // @route PUT /api/users/profile
  // @access Private
  updateProfile = asyncHandler(async (req, res) => {
    const { name, email, password } =
      this._userValidationService.validateUpdateProfile(req);

    const user = await User.findById(req.user!._id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;

      // Only updates if password is new otherwise it will try to hash the current password that's already hashed
      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("Usuário não encontrado");
    }
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
