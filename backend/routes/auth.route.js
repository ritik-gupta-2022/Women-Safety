import express from "express";
import { userSignin, userSignUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/user-signup", userSignUp)
router.post("/user-signin", userSignin)

export default router