import express from "express";
import UserController from "../controllers/UserController";

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

router.route("/").post(register).get(indexAll);
router.route("/profile").put(updateProfile).get(profile);
router.route("/auth").post(auth);
router.route("/logout").post(logout);
router.route("/user/:id").put(update).delete(remove).get(index);

export default router;
