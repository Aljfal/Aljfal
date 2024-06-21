import { connectToDB } from '@/mongodb';
import Comments from '@/Data/Comments';
connectToDB()

export default async function deleteComments(req, res) {
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
            const data=await Comments.find({Resturantid:id});
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
                const data = await Comments.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!data) {
                    return res.status(404).json({ success: false, message: "Comments not found" });
                }
                res.status(200).json({ success: true, data: data });
            } catch (error) {
                console.error("Error updating Comments:", error);
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        case'DELETE':
        try{
            const deleteComments=await Comments.deleteOne({_id:id});
            if(!deleteComments)
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