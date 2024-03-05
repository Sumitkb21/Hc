import { User } from "../models/Patient.js";
import bcrypt from "bcrypt";
import { send_cookies } from "../utils/features.js";
import { Pastrecord } from "../models/PatientPastRecord.js";
import jwt from "jsonwebtoken";



export const getall = async (req, res) => {
  const users = await User.find({});
  // const {name} = ;
  console.log(req.query);
  res.json({
    success: true,
    users,
  });
};

export const register = async (req, res) => {
  const { firstname, lastname, username, pfnumber, email, password } = req.body; // distructering values from an object
  let user = await User.findOne({ pfnumber });

  if (!user) {
    user = await User.findOne({ email });
  }

  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });

  const hashedpassword = await bcrypt.hash(password, 10);

  user = await User.create({
    firstname,
    lastname,
    username,
    pfnumber,
    email,
    password: hashedpassword,
  });

  send_cookies(user, res, "Registered Succesfully", 201);
};

export const login = async (req, res, next) => {
  const { pfnumber, password } = req.body; // distructering values from an object
  const user = await User.findOne({ pfnumber }).select("+password");

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User dosen't Exist",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid Password",
    });

  send_cookies(user, res, `Welcome back ${user.firstname}`, 200);
};



export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};


export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "logout succesfully ",
    });
};



export const getPastrecord = async(req,res) =>{
  const {token} = req.cookies;
  // console.log(req.headers.cookies);
  if(!token) return res.status(401).json({
    success: false,
    message: "Login first",
  });
    
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const {pfnumber} = await User.findById(decoded._id);
  const record  = await Pastrecord.find({pfnumber});
  
  res.status(200).json({
  success: true,
  message:"send succefully",
  record,
  });

  }








  
  