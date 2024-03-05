import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({  
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
      flag1 : { // for medical
        type:Boolean,
        default: true,
      },
      flag2 : { // for Apollo
        type:Boolean,
        default: false,
      },
      reg_no:{
      type: String,
      default: "1234",
      },
      imglink:{
          type: String,
           default:" ",
      }
      ,
      createdAt: {
          type: Date,
          default : Date.now(),
      },

});
  
export const Record = mongoose.model("Record", imageSchema);