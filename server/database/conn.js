import mongoose from "mongoose";

const DataBase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/jobdb');
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Error Detected ${error}`);
  }
};

export default DataBase;
