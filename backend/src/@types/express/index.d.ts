interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
