import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstname: {
       type: String,
    },
    
    email:{
        type: String,
        unique: true,
        required: true,
    },  
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default : Date.now(),
    },
});
 




export const Staff = mongoose.model("staff" , schema );
