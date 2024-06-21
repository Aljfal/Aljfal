import multer from 'multer';
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: './public/uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};



export default async function deleteimage  (req, res)  {
    const{
        query:{id}
        }=req;
        const {  headers } = req;
        const secretToken = process.env.secretToken; 
    
        // Check if the request includes the correct token in the headers
        const token = headers.authorization;
    
        if (token != `Bearer ${secretToken}`) {
            return res.status(401).json({ success: false, message: "Unauthorized",data:token });
        }

    const filePath = path.join(process.cwd(), '/public/uploads/images', id);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Failed to delete file' });
      }
      return res.status(200).json({ message: 'File deleted successfully' });
    });
  };
