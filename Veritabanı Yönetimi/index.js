import mongoose from "mongoose";

const connection={};

export const connectToDB = async () => {
  if(connection.isConnected)
    {
        return;
    }

    const db=await mongoose.connect(process.env.MONGODB_URL,{
      dbName: "Resturant",

  });
  connection.isConnected=db.connections[0].readystate;

  
};
