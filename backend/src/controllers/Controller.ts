import { NextFunction, Request, Response } from "express";

export default interface Controller {
  indexAll?: (req: Request, res: Response, next: NextFunction) => void;
  index?: (req: Request, res: Response, next: NextFunction) => void;
  create?: (req: Request, res: Response, next: NextFunction) => void;
  createMultiple?: (req: Request, res: Response, next: NextFunction) => void;
  update?: (req: Request, res: Response, next: NextFunction) => void;
  delete?: (req: Request, res: Response, next: NextFunction) => void;
}
