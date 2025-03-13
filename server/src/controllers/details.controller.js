import { query } from "express";
import User from "../models/Users.model.js";
import { uploadsUtil } from "../utils/cloudinary.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const handleFileUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const data = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await uploadsUtil(data);
    return res.json({ success: true, result });
  } catch (err) {
    console.log("Error in Uploading the image to Cloudinary", err);
    return res.status(400).json({
      success: false,
      message: "Error while uploading image to cloudinary",
    });
  }
};

const addMessage = async (req, res) => {
  try {
    const { query, file } = req.body;
    if (!query) {
      return res.json({
        success: false,
        message: "Need a query!!",
      });
    }

    const { userId } = req.params;
    const user = await User.findById(userId);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });  // Use correct model name

    const prompt = `Here are the following queries raised by the user:
    - Files: ${file ? file : null}
    - Query: ${query}  
    Provide the best possible response based on the user's query.`;

    const result = await model.generateContent({ 
      contents: [{ role: "user", parts: [{ text: prompt }] }]  // Corrected API call format
    });

    console.log("Gemini API Response:", JSON.stringify(result, null, 2));  // Debugging

    const response = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    console.log({response});

    user.query.push(query);
    user.file.push(file);
    user.results.push(response);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Details processed and uploaded successfully",
      response,
    });
  } catch (err) {
    console.error("Error while adding new message", err);
    return res.status(400).json({
      success: false,
      message: "Couldn't add new message",
    });
  }
};


// get all messages
const fetchAllMessages = async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched all messages successfully",
      query: user.query,
      file: user.file,
      results: user.results,
    });
  } catch (err) {
    console.log("Couldn't fetch all the messages, ", err);
    return res.json({
      success: false,
      message: "Error while fetching all the messages",
    });
  }
};

// Delete all chats
const deleteAllMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId); // to delete all the data;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Clear the arrays
    user.query = [];
    user.file = [];
    user.results = [];
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Deleted all messages successfully",
    });
  } catch (err) {
    console.log("Couldn't delete all the messages, ", err);
    return res.json({
      success: false,
      message: "Error while deleting all the messages",
    });
  }
};

export { handleFileUpload, addMessage, fetchAllMessages, deleteAllMessages };
