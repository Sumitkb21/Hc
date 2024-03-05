import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now()
    }
});
 



export const OTP = mongoose.model("OTP" , schema );
// export const User = mongoose.model("_database" , schema );
// export const User = mongoose.model("patients_database" , schema );
