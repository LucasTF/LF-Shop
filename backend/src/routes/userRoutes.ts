import express from "express";

import UserController from "../controllers/UserController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

const {
  auth,
  register,
  logout,
  profile,
  updateProfile,
  index,
  indexAll,
  update,
  delete: remove,
} = new UserController();

router.route("/").post(register).get(protect, admin, indexAll);
router.route("/profile").put(protect, updateProfile).get(protect, profile);
router.route("/auth").post(auth);
router.route("/logout").post(protect, logout);
router
  .route("/user/:id")
  .put(protect, admin, update)
  .delete(protect, admin, remove)
  .get(protect, admin, index);

export default router;
