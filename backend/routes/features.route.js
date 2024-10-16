import express from "express";
import { getNews, sendAlert } from "../controllers/features.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/send-alert", verifyToken, sendAlert);
router.get("/get-news", getNews)

export default router