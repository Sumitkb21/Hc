import express from "express" ;
import { getPastrecord, getall } from "../controllers/patient.js";
import { register } from "../controllers/patient.js";
import { login } from "../controllers/patient.js";
import { getProfile } from "../controllers/patient.js";
import { isAuthenticated, isAuthenticatedApollo, isAuthenticatedDoctor, isAuthenticatedLab, isAuthenticatedMedical, isAuthenticatedNurse, isAuthenticatedReception } from "../middlewares/auth.js";
import { logout } from "../controllers/patient.js";
import { otpsend, otpverify } from "../controllers/otp.js";
import { apolloRegister, apollologin, labRegister, lablogin, medicalRegister, medicallogin, nurseRegister, nurselogin, receptionRegister, receptionlogin} from "../controllers/staff.js";
import { createAppointments, getAppointmentsdoctor } from "../controllers/appointments.js";
import { doclogin, docRegister, sendPastrecord } from "../controllers/doctor.js";
import { addInApollo, getApolloPastRecord, getAppointmentsByApollo, updateApollo } from "../controllers/apollo.js";
import { getAppointmentsmedical, getMedicalPastRecord, notreferbymedical, referbymedical } from "../controllers/medical.js";
import { makeRecord } from "../controllers/record.js";
import { addInMedical } from "../controllers/medical.js";

import { getAppointmentsReception } from "../controllers/reception.js";
import { getAppointmentsByNurse, updateByNurse } from "../controllers/nurse.js";
import { getAppointmentsByLab } from "../controllers/lab.js";




const router = express.Router();

router.get("/all", getall);
router.post("/register", register);
router.post("/login", login);

router.get("/logout", logout);


router.post("/emailverify",otpsend);
router.post("/otpverify",otpverify);


router.post("/docRegisterister" , docRegister);
router.post("/doctorlogin" , doclogin);

router.post("/lablogin" , lablogin);
router.post("/labregister" , labRegister);


router.post("/nurselogin" , nurselogin);
router.post("/nurseregister" , nurseRegister);



router.post("/medicallogin" , medicallogin);
router.post("/medicalregister" , medicalRegister);




router.post("/receptionlogin" , receptionlogin);
router.post("/receptionregister" , receptionRegister);


router.post("/apollologin" , apollologin);
router.post("/apolloregister" , apolloRegister);

//uses of parameters

//these are for authentification
router.get("/patientHome",isAuthenticated,getProfile);
router.get("/receptionHome",isAuthenticatedReception,getProfile);
router.get("/doctorHome",isAuthenticatedDoctor,getProfile);
router.get("/labHome",isAuthenticatedLab,getProfile);
router.get("/medicalHome",isAuthenticatedMedical,getProfile);
router.get("/apolloHome",isAuthenticatedApollo,getProfile);
router.get("/nurseHome",isAuthenticatedNurse,getProfile);
/////

///

router.get("/getpastrecords", getPastrecord);
router.post("/createAppointments",createAppointments);
router.get("/getAppointmentsdoctor",getAppointmentsdoctor);
router.get("/getAppointmentsReception",getAppointmentsReception);


router.post("/addInApollo" , addInApollo);
router.post("/addInMedical" ,addInMedical);
router.get("/getAppointmentsmedical" , getAppointmentsmedical);
router.get("/getAppointmentsapollo" , getAppointmentsByApollo);

router.post("/sendPastrecord" , sendPastrecord);
router.get("/apollopastrecord" , getApolloPastRecord);
router.get("/medicalpastrecord" , getMedicalPastRecord);

router.post("/updateApollo" , updateApollo);
router.post("/referbymedical" , referbymedical);
router.post("/notreferbymedical" , notreferbymedical);
router.get("/getAppointmentsByNurse" , getAppointmentsByNurse);

// router.post("/record" , makeRecord);



//these are not checked
router.post("/updateByNurse" , updateByNurse);
router.get("/getAppointmentsByLab" , getAppointmentsByLab);









// router.post("/getAppointmentsdoctor",getAppointmentsdoctor);


export default router;