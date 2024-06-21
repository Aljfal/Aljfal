import { connectToDB } from '@/mongodb';
import Login from '@/Data/Login';
connectToDB()
import { hashPassword } from '@/mongodb/auth';

export default async function deleteLogin(req, res) {
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
            const data=await Login.findById(id);
            if(!Login)
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
                const {  ...rest } = req.body;
                // Retrieve the existing user data from the database
                const existingData = await Login.findById(id);
        
                if (!existingData) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                const newPassword=rest.Password
                let newData = { ...rest }; // Copy other fields from req.body
        
                // Check if the password field is included in the request body and has changed
                if ( newPassword !== existingData.Password) {
                    // Password has changed, encrypt the new password
                    const hashedPassword = await hashPassword(newPassword)
                    newData.Password = hashedPassword; // Update the password in newData
                }
        
                // Perform the update operation
                const data = await Login.findByIdAndUpdate(id, newData, {
                    new: true,
                    runValidators: true
                });
        
                if (!data) {
                    return res.status(400).json({ success: false });
                }
        
                res.status(200).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        break;
        case'DELETE':
        try{
            const deleteLogin=await Login.deleteOne({_id:id});
            if(!deleteLogin)
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