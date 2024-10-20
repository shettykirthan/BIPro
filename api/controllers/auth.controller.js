import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists!',
      });
    }

  
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
    });
  } catch (error) {
    console.error('Signup error:', error); 
    res.status(500).json({
      success: false,
      message: 'An error occurred during signup.',
    });
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }

    
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Wrong credentials!',
      });
    }

    
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    
    const userWithoutPassword = { ...validUser._doc };
    delete userWithoutPassword.password;

    
    res.cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .status(200)
      .json({
        success: true,
        message: 'User signed in successfully!',
        user: userWithoutPassword,
        access_token: token 
      });
  } catch (error) {
    console.error('Signin error:', error); 
    res.status(500).json({
      success: false,
      message: 'An error occurred during signin.',
    });
  }
};


export const signout = async (req, res, next) => {
  try {
    
    res.clearCookie('access_token', { httpOnly: true });

    
    if (req.session) {
      req.session.destroy();
    }

    
    res.status(200).json({
      success: true,
      message: 'User signed out successfully!',
    });
  } catch (error) {
    console.error('Signout error:', error); 
    res.status(500).json({
      success: false,
      message: 'An error occurred during signout.',
    });
  }
};
