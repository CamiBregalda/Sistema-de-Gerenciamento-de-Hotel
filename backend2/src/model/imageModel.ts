import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new mongoose.Schema({
    image: Buffer, // O campo `image` é do tipo Buffer
  });
  
  const ImageModel = mongoose.model('Image', imageSchema);