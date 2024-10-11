import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists!'
      });
    }

    // Hash the password and create a new user
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred during signup.'
    });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found!'
      });
    }

    // Compare the provided password with the stored hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Wrong credentials!'
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Exclude the password field from the user object
    const userWithoutPassword = { ...validUser._doc };
    delete userWithoutPassword.password;

    // Set cookie with JWT token
    res.cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: 'User signed in successfully!',
        user: userWithoutPassword
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred during signin.'
    });
  }
};

export const signout = async (req, res, next) => {
  try {
    // Clear the 'access_token' cookie
    res.clearCookie('access_token', { httpOnly: true });

    // Clear user session if needed
    if (req.session) {
      delete req.session.user;
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'User signed out successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred during signout.'
    });
  }
};
