import { User } from "../models/Patient.js";
import { OTP } from "../models/PatientVerification.js";
// import nodemailer
import nodemailer from "nodemailer";


export const otpsend = async (req, res) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASS, // generated ethereal password
        },
      });
  
      const { email } = req.body;
  
      const user = await User.findOne({ email });
  
      if (user)
        return res.status(404).json({
          success: false,
          message: "User Already Exist",
        });
  
      let otp = "";
      for (let i = 0; i <= 3; i++) {
        const randval = Math.round(Math.random() * 9);
        otp = otp + randval;
      }
  
      await OTP.deleteMany({ email }); //previous Otps deleted after this line
  
      await OTP.create({ email, token: otp });
  
      let mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "OTP Verification from Health Center",
        text: `Hey buddy !! \n This is the requested OTP: ${otp}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        message: "Otp Sent Successfully",
      });
    } catch (error) {
      res.status(401).json({
        message: "OTP has not sent ",
      });
    }
  };
  
  export const otpverify = async (req, res) => {
    const { email, otp } = req.body;
  
    const valid = await OTP.findOne({ email });
  
    if (!valid) {
      res.status(404).json({
        success: false,
        message: "Please send OTP first",
      });
    }
  
    if (valid.token === otp) {
      res.status(200).json({
        success: true,
        message: "OTP Verified",
      });
    } else {
      res.status(406).json({
        success: false,
        message: "Incorrect OTP",
      });
    }
  };