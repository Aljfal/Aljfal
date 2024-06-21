import Reservation from "@/Data/Reservations";
import { connectToDB } from "@/mongodb";


export default async function GetReservation(req, res) {
  const{method}=req;
  const {  headers } = req;
  const secretToken = process.env.secretToken; 

  // Check if the request includes the correct token in the headers
  const token = headers.authorization;

  if (token != `Bearer ${secretToken}`) {
      return res.status(401).json({ success: false, message: "Unauthorized",data:token });
  }
  await connectToDB()
  switch(method)
  {
      case'GET':
      try{
          const data=await Reservation.find({});
          res.status(200).json({success:true,data:data});
      }catch(error){
          res.status(400).json({success:false,error});
      }
      break;
      case'POST':
      try{
          const data=await Reservation.create(req.body);
          res.status(201).json({success:true,data:data});
      }catch(error){
          res.status(400).json({success:false,error});

      }
      break;
      default:
          res.status(400).json({success:false,error});
      break;
  }
}
