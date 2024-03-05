import bcrypt from "bcrypt";
import { send_cookies } from "../utils/features.js";
import { Doctor } from "../models/doctor.js";
import { Pastrecord } from "../models/PatientPastRecord.js";
import { Record } from "../models/record.js";
import {v2 as cloudinary} from 'cloudinary';          
import { ApolloPastrecord } from "../models/apolloPastrecord.js";

          
cloudinary.config({ 
  cloud_name: 'dt8idppf9', 
  api_key: '774145224114334', 
  api_secret: 'GPCyQ7o-9_QxL30Ni2PH6gufvjs' 
});





export const getAppointmentsByLab = async(req,res) =>{
  
    // console.log(req.headers.cookies);
    
    
    const appointments  = await Record.find();
    
    res.status(200).json({
    success: true,
    message:"send succefully",
    appointments,
    });
  
    }


