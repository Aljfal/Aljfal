import { connectToDB } from '@/mongodb';
import Meals from '@/Data/Meals';
connectToDB()

export default async function deleteMeals(req, res) {
    const{
        method,
        query:{id}
        }=req;
        const {  headers } = req;
        const secretToken = process.env.secretToken; 
    
        // Check if the request includes the correct token in the headers
        const token = headers.authorization;
    
        if (token != `Bearer ${secretToken}`) {
            return res.status(401).json({ success: false, message: "Unauthorized",data:token });
        }
    switch(method)
    {
        case'GET':
        try{
            const data=await Meals.find({Resturantid:id});
            if(!Meals)
            {
               return res.status(400).json({success:false});
            }
            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        case'PUT':
        try{
            const data=await Meals.findByIdAndUpdate(id,req.body,
                {
                    new:true,
                    runValidators:true
                });
            if(!Meals)
            {
               return res.status(400).json({success:false});
            }

            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false,error});
        }
        break;
        case'DELETE':
        try{
            const deleteMeals=await Meals.deleteOne({_id:id});
            if(!deleteMeals)
            {
               return res.status(400).json({success:false});
            }

            res.status(200).json({success:true,data:{}});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        default:
            res.status(400).json({success:false});
        break;
    }
  }