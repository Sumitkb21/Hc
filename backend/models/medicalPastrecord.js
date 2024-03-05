import mongoose from "mongoose";

const schema = new mongoose.Schema({
    pfnumber:{
      type: String,
      required: true,
    },
    firstname:String,
    lastname:String,
    doctorname: {
        type: String,
        required: true,
    },
    reg_no:{
    type: String,
    },
    imglink:{
        type: String,
       
    },
    
    createdAt: {
        type: Date,
        default : Date.now(),
    },
});
 

export const MedicalPastrecord = mongoose.model("medicalpastrecord" , schema );

