import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    query: Array,
    file: Array, 
    results: Array, 
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
