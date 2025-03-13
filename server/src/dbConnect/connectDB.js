import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionObj = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "MongoDB connection established !! DB HOST - ",
      connectionObj.connection.host
    );
  } catch (err) {
    console.log("Error while connecting the database", err);
    process.exit(1);
  }
};

export default connectDB;
