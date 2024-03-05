import { User } from "../models/Patient.js";
import jwt from "jsonwebtoken"

import { Doctor } from "../models/doctor.js";
import { Lab } from "../models/lab.js";
import { Reception } from "../models/reception.js";
import { Nurse } from "../models/nurse.js";
import { Medical } from "../models/medical.js";
import { Apollo } from "../models/apollo.js";

export const isAuthenticated = async(req,res,next) =>{
    
    const {token} = req.cookies;
    console.log(req.headers.cookies);
    if(!token) return res.status(401).json({
        success: false,
        message: "Login first",
    });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    

    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Login first",
        }); 
    }


    next();

} 





export const isAuthenticatedDoctor = async(req,res,next) =>{
    
    const {token} = req.cookies;
    console.log(req.headers.cookies);
    if(!token) return res.status(401).json({
        success: false,
        message: "Login first",
    });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Doctor.findById(decoded._id);
    
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Login first",
        }); 
    }

    next();

}
export const isAuthenticatedLab = async(req,res,next) =>{
    
    const {token} = req.cookies;
    console.log(req.headers.cookies);
    if(!token) return res.status(401).json({
        success: false,
        message: "Login first",
    });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Lab.findById(decoded._id);
    
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Login first",
        }); 
    }

    next();

}



export const isAuthenticatedReception = async(req,res,next) =>{
    
    const {token} = req.cookies;
    console.log(req.headers.cookies);
    if(!token) return res.status(401).json({
        success: false,
        message: "Login first",
    });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Reception.findById(decoded._id);
    
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Login first",
        }); 
    }

    next();

}





export const isAuthenticatedNurse = async(req,res,next) =>{
    
    const {token} = req.cookies;
    console.log(req.headers.cookies);
    if(!token) return res.status(401).json({
        success: false,
        message: "Login first",
    });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Nurse.findById(decoded._id);
    
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Login first",
        }); 
    }

    next();

}

export const isAuthenticatedMedical = async(req,res,next) =>{
    
    const {token} = req.cookies;
    console.log(req.headers.cookies);
    if(!token) return res.status(401).json({
        success: false,
        message: "Login first",
    });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Medical.findById(decoded._id);
    
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Login first",
        }); 
    }

    next();

}


export const isAuthenticatedApollo = async(req,res,next) =>{
    
    const {token} = req.cookies;
    console.log(req.headers.cookies);
    if(!token) return res.status(401).json({
        success: false,
        message: "Login first",
    });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Apollo.findById(decoded._id);
    
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Login first",
        }); 
    }

    next();

}


