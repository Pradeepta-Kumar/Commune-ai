import express from "express";
import {
  handleFileUpload,
  addMessage,
  fetchAllMessages,
  deleteAllMessages,
} from "../controllers/details.controller.js";
import { upload } from "../utils/cloudinary.js";
const router = express.Router();

router.post(
  "/upload-files",
  upload.single("my_file"),
  handleFileUpload
);
router.post("/add-message/:userId", addMessage);
router.get("/fetch-all-messages/:userId", fetchAllMessages);
router.delete("/delete-all-messages/:userId", deleteAllMessages);

export default router;
