import express from "express";
import { fakeCall, getNews, getTutorials, sendAlert } from "../controllers/features.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/send-alert", verifyToken, sendAlert);
router.post("/fake-call", verifyToken, fakeCall);
router.get("/get-news", verifyToken, getNews);
router.get("/defense-tutorials", verifyToken, getTutorials);

export default router