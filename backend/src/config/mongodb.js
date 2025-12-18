import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB using URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connection success event
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connection established");
    });

    // Optional: log if disconnected
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB connection disconnected");
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
