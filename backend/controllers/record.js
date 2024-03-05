import { Record } from '../models/record.js';
import {v2 as cloudinary} from 'cloudinary';          

          
cloudinary.config({ 
  cloud_name: 'dt8idppf9', 
  api_key: '774145224114334', 
  api_secret: 'GPCyQ7o-9_QxL30Ni2PH6gufvjs' 
});

export const makeRecord = async(req,res)=>{
    { 
        
        const {image} = req.body;
        
        cloudinary.uploader.upload(image,{public_id:"prescription"})
        .then(async(result)=>{
        console.log(result.url);
        
        await Record.create({img:result.url});       
        res.status(200).send({
          message: "success",
          result
         });
        }).catch((error) => {
         res.status(500).send({
          message: "failure",
          error
         });

         
        });
    }
}






