import { connectToDB } from '@/mongodb';
import Gallary from '@/Data/Gallary';
connectToDB()

export default async function deleteGallary(req, res) {
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
            const data=await Gallary.find({Resturantid:id});
            if(!data)
            {
               return res.status(400).json({success:false});
            }
            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        case 'PUT':
            try {
                const data = await Gallary.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!data) {
                    return res.status(404).json({ success: false, message: "Gallary not found" });
                }
                res.status(200).json({ success: true, data: data });
            } catch (error) {
                console.error("Error updating Gallary:", error);
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        case'DELETE':
        try{
            const deleteGallary=await Gallary.deleteOne({_id:id});
            if(!deleteGallary)
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