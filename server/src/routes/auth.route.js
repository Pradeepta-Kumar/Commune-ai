import express from "express";
import {
  signup,
  signin,
  signout,
  authMiddleware,
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/sign-out", signout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "Unauthenticated user" });
  return res
    .status(200)
    .json({ success: true, message: "User authenticated", user });
});

export default router;
