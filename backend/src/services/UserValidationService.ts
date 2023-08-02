import { Request } from "express";
import { z } from "zod";

interface UserValidationServiceInterface {
  validateAuth: (req: Request) => { email: string; password: string };
  validateRegister: (req: Request) => {
    name: string;
    email: string;
    password: string;
  };
  validateUpdateProfile: (req: Request) => {
    name?: string;
    email?: string;
    password?: string;
  };
}

class UserValidationService implements UserValidationServiceInterface {
  protected _authSchema;
  protected _registerSchema;
  protected _updateProfileSchema;

  constructor() {
    const name = z.string().min(3).max(30);
    const email = z.string().email().min(3).max(30);
    const password = z.string().min(3).max(30);

    this._authSchema = z.object({
      email,
      password,
    });
    this._registerSchema = z.object({
      name,
      email,
      password,
    });
    this._updateProfileSchema = z.object({
      name: name.optional(),
      email: email.optional(),
      password: password.optional(),
    });
  }

  validateAuth = (req: Request) => {
    this._authSchema.parse(req.body);
    return {
      email: <string>req.body.email,
      password: <string>req.body.password,
    };
  };

  validateRegister = (req: Request) => {
    this._registerSchema.parse(req.body);
    return {
      name: <string>req.body.name,
      email: <string>req.body.email,
      password: <string>req.body.password,
    };
  };

  validateUpdateProfile = (req: Request) => {
    this._updateProfileSchema.parse(req.body);
    return {
      name: <string | undefined>req.body.name,
      email: <string | undefined>req.body.email,
      password: <string | undefined>req.body.password,
    };
  };
}

export default UserValidationService;
