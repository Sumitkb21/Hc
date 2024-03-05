
import { AllAppointments } from "../models/receptiondatabase.js";


export const getAppointmentsReception = async(req,res) =>{
  
    // console.log(req.headers.cookies);
    
    
    const appointments  = await AllAppointments.find();
    
    res.status(200).json({
    success: true,
    message:"send succefully",
    appointments,
    });
  
}