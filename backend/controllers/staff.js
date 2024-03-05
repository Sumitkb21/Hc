import bcrypt from "bcrypt";
import { send_cookies } from "../utils/features.js";

// import nodemailer
import {Lab} from "../models/lab.js";
import { Reception } from "../models/reception.js";
import { Nurse } from "../models/nurse.js";
import { Apollo } from "../models/apollo.js";
import { Medical } from "../models/medical.js";


export const labRegister = async (req, res) => {
    const { firstname, email, password } = req.body; // distructering values from an object
    let staff = await Lab.findOne({ email });
  
  
    if (staff){ 
        
        return res.status(404).json({
        success: false,
        message: "staff Already Exist",
      });
    
    }
     
  
    const hashedpassword = await bcrypt.hash(password, 10);
  
    staff = await Lab.create({
      firstname,
      email,
      password: hashedpassword,
    });
  
    send_cookies(staff, res, "Registered Succesfully", 201);
  };



export const lablogin = async (req, res) => {
  const { email, password } = req.body;
  const staff = await Lab.findOne({ email });

  if (!staff)
    return res.status(404).json({
      success: false,
      message: "You are not the valid staff",
    });

  const isMatch = await bcrypt.compare(password, staff.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid Password",
    });

  send_cookies(staff, res, `Welcome back ${staff.firstname}`, 200);
};




export const receptionRegister = async (req, res) => {
    const { firstname, email, password } = req.body; // distructering values from an object
    let staff = await Reception.findOne({ email });
  
  
    if (staff){ 
        
        return res.status(404).json({
        success: false,
        message: "staff Already Exist",
      });
    
    }
     
  
    const hashedpassword = await bcrypt.hash(password, 10);
  
    staff = await Reception.create({
      firstname,
      email,
      password: hashedpassword,
    });
  
    send_cookies(staff, res, "Registered Succesfully", 201);
  };



export const receptionlogin = async (req, res) => {
  const { email, password } = req.body;
  const staff = await Reception.findOne({ email });

  if (!staff)
    return res.status(404).json({
      success: false,
      message: "You are not the valid staff",
    });

  const isMatch = await bcrypt.compare(password, staff.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid Password",
    });

  send_cookies(staff, res, `Welcome back ${staff.firstname}`, 200);
};




export const nurseRegister = async (req, res) => {
    const { firstname, email, password } = req.body; // distructering values from an object
    let staff = await Nurse.findOne({ email });
  
  
    if (staff){ 
        
        return res.status(404).json({
        success: false,
        message: "staff Already Exist",
      });
    
    }
     
  
    const hashedpassword = await bcrypt.hash(password, 10);
  
    staff = await Nurse.create({
      firstname,
      email,
      password: hashedpassword,
    });
  
    send_cookies(staff, res, "Registered Succesfully", 201);
  };



export const nurselogin = async (req, res) => {
  const { email, password } = req.body;
  const staff = await Nurse.findOne({ email });

  if (!staff)
    return res.status(404).json({
      success: false,
      message: "You are not the valid staff",
    });

  const isMatch = await bcrypt.compare(password, staff.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid Password",
    });

  send_cookies(staff, res, `Welcome back ${staff.firstname}`, 200);
};


export const apollologin = async (req, res) => {
  const { email, password } = req.body;
  const staff = await Apollo.findOne({ email });

  if (!staff)
    return res.status(404).json({
      success: false,
      message: "You are not the valid staff",
    });

  const isMatch = await bcrypt.compare(password, staff.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid Password",
    });

  send_cookies(staff, res, `Welcome back ${staff.firstname}`, 200);
};


export const apolloRegister = async (req, res) => {
    const { firstname, email, password } = req.body; // distructering values from an object
    let staff = await Apollo.findOne({ email });
  
  
    if (staff){ 
        
        return res.status(404).json({
        success: false,
        message: "staff Already Exist",
      });
    
    }
     
  
    const hashedpassword = await bcrypt.hash(password, 10);
  
    staff = await Apollo.create({
      firstname,
      email,
      password: hashedpassword,
    });
  
    send_cookies(staff, res, "Registered Succesfully", 201);
  };



  /////////////////////////////medical
  
export const medicallogin = async (req, res) => {
    const { email, password } = req.body;
    const staff = await Medical.findOne({ email });
  
    if (!staff)
      return res.status(404).json({
        success: false,
        message: "You are not the valid staff",
      });
  
    const isMatch = await bcrypt.compare(password, staff.password);
  
    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
  
    send_cookies(staff, res, `Welcome back ${staff.firstname}`, 200);
  };
  
  
  export const medicalRegister = async (req, res) => {
      const { firstname, email, password } = req.body; // distructering values from an object
      let staff = await Medical.findOne({ email });
    
    
      if (staff){ 
          
          return res.status(404).json({
          success: false,
          message: "staff Already Exist",
        });
      
      }
       
    
      const hashedpassword = await bcrypt.hash(password, 10);
    
      staff = await Medical.create({
        firstname,
        email,
        password: hashedpassword,
      });
    
      send_cookies(staff, res, "Registered Succesfully", 201);
    };
  