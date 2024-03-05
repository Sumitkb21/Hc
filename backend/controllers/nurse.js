import bcrypt from "bcrypt";
import { send_cookies } from "../utils/features.js";
import { Doctor } from "../models/doctor.js";
import { Pastrecord } from "../models/PatientPastRecord.js";
import { Record } from "../models/record.js";
import {v2 as cloudinary} from 'cloudinary';          
import { ApolloPastrecord } from "../models/apolloPastrecord.js";
import { Appointments } from "../models/appointments.js";

          
cloudinary.config({ 
  cloud_name: 'dt8idppf9', 
  api_key: '774145224114334', 
  api_secret: 'GPCyQ7o-9_QxL30Ni2PH6gufvjs' 
});





export const getAppointmentsByNurse = async(req,res) =>{
  
    // console.log(req.headers.cookies);
    
    
    const appointments  = await Appointments.find();
    
    res.status(200).json({
    success: true,
    message:"send succefully",
    appointments,
    });

  
}



export const updateByNurse  = async(req, res)=> { 
            
    const {image , reg_no} = req.body;
    
    cloudinary.uploader.upload(image,{public_id:"prescription"})
    .then(async(result)=>{
      
    
    const update1 = {
        $set: {
            imglink:result.url,           
        }
      };
    
    
   
      await Appointments.findOneAndUpdate(
        {reg_no}, // Filter for finding the document
        update1, // Update operation to apply
      );
    
    res.status(200).send({
      message: "Submitted successfully",
      result
     });
    }).catch((error) => {
     res.status(500).send({
      message: "Failed to submit",
      error
     });
    });
}


