import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add the user name'],
      trim: true,
      unique: true, // Ensure usernames are unique across the database
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot be more than 30 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Please add the user email address'],
      unique: true, // Enforces email uniqueness in the database
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
      trim: true,
      lowercase: true, // Converts email to lowercase to avoid case-sensitive uniqueness issues
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
