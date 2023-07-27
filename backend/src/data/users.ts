import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const users: User[] = [
  {
    name: "Admin",
    email: "admin@lfshop.com",
    password: bcrypt.hashSync(process.env.ADMIN_PSWORD || "123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Lucas Ferreira",
    email: "lucas@lfshop.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
