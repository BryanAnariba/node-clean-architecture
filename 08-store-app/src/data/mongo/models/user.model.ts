import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  img: {
    type: String,
    default: ''
  },
  role: {
    type: [String],
    enum: ['ADMIN','USER'],
    default: ['USER'],
  }
});

export const UserModel = mongoose.model('User', userSchema);