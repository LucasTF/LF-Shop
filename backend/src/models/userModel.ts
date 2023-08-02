import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserSchema {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPasswords: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPasswords = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
