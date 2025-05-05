import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  const { email, password, name, country } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password and save new user
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, country });
    await newUser.save();

    res.status(201).json({ message: "Signup Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
};
