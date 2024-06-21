import { connectToDB } from '@/mongodb';
import OwnerRequests from '@/Data/OwnerRequests';
connectToDB()

export default async function deleteOwnerRequests(req, res) {
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
            const data=await OwnerRequests.find({Resturantid:id});
            if(!OwnerRequests)
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
            const data=await OwnerRequests.findByIdAndUpdate(id,req.body,
                {
                    new:true,
                    runValidators:true
                });
            if(!OwnerRequests)
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
            const deleteOwnerRequests=await OwnerRequests.deleteOne({_id:id});
            if(!deleteOwnerRequests)
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