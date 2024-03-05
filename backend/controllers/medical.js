import bcrypt from "bcrypt";
import { send_cookies } from "../utils/features.js";
import { Doctor } from "../models/doctor.js";
import { Pastrecord } from "../models/PatientPastRecord.js";
import { Record } from "../models/record.js";
import {v2 as cloudinary} from 'cloudinary';          
import { MedicalPastrecord } from "../models/medicalPastrecord.js";

          
cloudinary.config({ 
  cloud_name: 'dt8idppf9', 
  api_key: '774145224114334', 
  api_secret: 'GPCyQ7o-9_QxL30Ni2PH6gufvjs' 
});

export const getAppointmentsmedical = async(req,res) =>{
  
    // console.log(req.headers.cookies);
    
    
    const appointments  = await Record.find({flag1:true});
    
    res.status(200).json({
    success: true,
    message:"send succefully",
    appointments,
    });
  
}
export const getMedicalPastRecord = async(req,res) =>{
  
    // console.log(req.headers.cookies);
    
    
    const appointments  = await MedicalPastrecord.find();
    
    res.status(200).json({
    success: true,
    message:"send succefully",
    appointments,
    });
  
}





    export const referbymedical = async(req,res)=>{
        { 
            
            const {pfnumber,firstname,lastname,doctorname,reg_no,image} = req.body;
            
            cloudinary.uploader.upload(image,{public_id:"prescription"})
            .then(async(result)=>{
            // console.log(result.url);
            // const user = await Record.find({reg_no});
            
            
            const update1 = {
              $set: {
                  imglink:result.url,
                  flag1:false,
                  flag2:true,
                   // Update the status to 'cancelled', for example
                  // You can add more fields to update as needed
              }
            };
            
            const update2 = {
                $set: {
                    imglink:result.url,
                  
                     // Update the status to 'cancelled', for example
                    // You can add more fields to update as needed
                }
              };
            
            
            // if(user){
              await Pastrecord.findOneAndUpdate(
                {reg_no}, // Filter for finding the document
                update2, // Update operation to apply
              );
              await Record.findOneAndUpdate(
                { reg_no}, // Filter for finding the document
                update1, // Update operation to apply
              );
              

              const patient  = await MedicalPastrecord.findOne({reg_no}); 
              if(!patient){ 
              await MedicalPastrecord.create({
                pfnumber, doctorname, firstname, lastname, reg_no, imglink:result.url
              });
              }
              else{
                await MedicalPastrecord.findOneAndUpdate(
                  {reg_no}, // Filter for finding the document
                  update2, // Update operation to apply
                );      
              }

            
              
            // }

            res.status(200).json({
            success: true,
            message:"Referred to Apollo",
            });
            
            res.status(200).send({
              message: "Referred to Apollo",
              result
             });
            }).catch((error) => {
             res.status(500).send({
              message: "Failed to submit",
              error
             });
            });
        }
}
      


  
      

export const notreferbymedical = async(req,res)=>{
        { 
            
            const {pfnumber,firstname,lastname,doctorname,reg_no,image} = req.body;
            
            cloudinary.uploader.upload(image,{public_id:"prescription"})
            .then(async(result)=>{
            // console.log(result.url);
            const user = await Record.find({reg_no});
            
            
            const update1 = {
              $set: {
                  imglink:result.url,
                  flag1:false,
                  flag2:false,
                   // Update the status to 'cancelled', for example
                  // You can add more fields to update as needed
              }
            };
            
            const update2 = {
                $set: {
                    imglink:result.url,
                  
                     // Update the status to 'cancelled', for example
                    // You can add more fields to update as needed
                }
              };
            
            
            if(user){
              await Pastrecord.findOneAndUpdate(
                {reg_no}, // Filter for finding the document
                update2, // Update operation to apply
              );
              await Record.findOneAndUpdate(
                { reg_no}, // Filter for finding the document
                update1, // Update operation to apply
              );

              const patient  = await MedicalPastrecord.findOne({reg_no}); 
              if(!patient ){ 
              await MedicalPastrecord.create({
                pfnumber, doctorname, firstname, lastname, reg_no, imglink:result.url
              });
              }
              else{
                await MedicalPastrecord.findOneAndUpdate(
                  {reg_no}, // Filter for finding the document
                  update2, // Update operation to apply
                );      
              }

      
            }
            
            res.status(200).send({
              message: "Referred to Apollo",
              result
             });
            }).catch((error) => {
             res.status(500).send({
              message: "Failed to submit",
              errors
             });
            });
        }
      }
      
export const addInMedical = async(req,res) =>{
        const{ pfnumber,  firstname , lastname ,doctorname, reg_no,imglink} = req.body;
          // console.log(req.headers.cookies);
          
          
          await MedicalPastrecord.create({
              pfnumber, doctorname, firstname, lastname, reg_no, imglink
          });
          
          res.status(200).json({
          success: true,
          message:"created succesfully",
          });

        
  }
  