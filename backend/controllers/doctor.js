import bcrypt from "bcrypt";
import { send_cookies } from "../utils/features.js";
import { Doctor } from "../models/doctor.js";
import { Pastrecord } from "../models/PatientPastRecord.js";
import { Record } from "../models/record.js";

import {v2 as cloudinary} from 'cloudinary';          
import { Appointments } from "../models/appointments.js";

          
cloudinary.config({ 
  cloud_name: 'dt8idppf9', 
  api_key: '774145224114334', 
  api_secret: 'GPCyQ7o-9_QxL30Ni2PH6gufvjs' 
});


// export const doctorreg  = async(req, res)=>{
//     const { firstname, lastname, email, password } = req.body; // distructering values from an object
//     let doc = await Doctor.findOne({ email });
  
  
//     if (doc){ 
//         return res.status(404).json({
//         success: false,
//         message: "Doctor Already Exist",
//       });
    
//     }
     
  
//     const hashedpassword = await bcrypt.hash(password, 10);
  
//     doc = await Doctor.create({
//       firstname,
//       lastname,
//       email,
//       password: hashedpassword,
//     });
  
//     send_cookies(doc, res, "Registered Succesfully", 201);
       
// }


export const docRegister = async (req, res) => {
  const { firstname, email, password , lastname } = req.body; // distructering values from an object
  let doctor = await Doctor.findOne({ email });


  if (doctor){ 
      
      return res.status(404).json({
      success: false,
      message: "Doctor Already Exist",
    });
  
  }
   
  console.log("herere")

  const hashedpassword = await bcrypt.hash(password, 10);

  doctor = await Doctor.create({
    firstname,
    lastname,
    email,
    password: hashedpassword,
  });

  send_cookies(doctor, res, "Registered Succesfully", 201);
};



export const doclogin = async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor)
      return res.status(404).json({
        success: false,
        message: "Doctor dosen't Exist",
      });
  
    const isMatch = await bcrypt.compare(password, doctor.password);
  
    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
  
    send_cookies(doctor, res, `Welcome back ${doctor.firstname}`, 200);
  };



  
// export const sendPastrecord = async(req,res)=>{
//   const {pfnumber,firstname,lastname,doctorname,imglink} = req.body ;

//   // const patient =  await User.findOne({pfnumber});
 

//   // const {firstname, lastname} = patient ;
//   const record =  await Pastrecord.create({
//       firstname,
//       lastname,
//       pfnumber,
//       doctorname,
//       imglink,
//   })

//  if(record){
//   res.status(200).json({
//       success:true,
//       message: "Record Send",
//   })
//  }
//  else{
//   res.status(401).json({
//       success:false,
//       message: "Record not Send",
//   })
//  } 
// }; 



//this function is creating, both pastreocrd , and record (which is usse by medical and apollo for temparary and also by doctor)
export const sendPastrecord = async(req,res)=>
  { 
      
    const {pfnumber,firstname,lastname,doctorname,reg_no,image} = req.body;

      // console.log(pfnumber,firstname,lastname,doctorname);
      
      cloudinary.uploader.upload(image,{public_id:"prescription"})
      .then(async(result)=>{
      // console.log(result.url);
     
      const patient = await Pastrecord.findOne({reg_no});
      if(!patient){

      const record =  await Pastrecord.create({
        firstname,
        lastname,
        pfnumber,
        doctorname,
        reg_no,
        imglink:result.url,
    });

      await Record.create({
        reg_no,
        firstname,
        lastname,
        pfnumber,
        doctorname,
        imglink:result.url,
      });       
      await Appointments.deleteOne({ reg_no });
      } // Use deleteOne instead of findOneAndDelete
      
      else{

        const update = {
          $set: {
              imglink:result.url 
          }
        };


       

        await Pastrecord.findOneAndUpdate(
          {reg_no}, // Filter for finding the document
          update, // Update operation to apply
        );
      }

      res.status(200).send({
        message: "Prescription submitted successfully",
        result
       });
      }
      
      
      
      ).catch((error) => {
       res.status(500).send({
        message: "Failed to upload",
        error
       });
      });
     
  }


