import { connectToDB } from "@/mongodb";

import Login from "@/Data/Login";
import { hashPassword } from "@/mongodb/auth";

export default async function handler(req, res) {
  await connectToDB();
  if (req.method === "POST") {
    const dataa = req.body;
    const { username, Mail, PhoneNumber, Adress, Password, Gender } = dataa;

    if (
      !Mail ||
      !Mail.includes("@") ||
      !Password ||
      Password.trim().length < 7
    ) {
      res
        .status(422)
        .json({
          message:
            "Invalid input - Password should be at least 7 charcters long.",
          data: Mail.includes("@"),
        });
      return;
    }
    const existuser = await Login.findOne({ Mail: Mail });

    if (existuser) {
      res.status(422).json({ message: "User exists already!" });
      return;
    }

    const hashedPassword = await hashPassword(Password);

    const data = await Login.create({
      Mail: Mail,
      Password: hashedPassword,
      PhoneNumber: PhoneNumber,
      username: username,
      Adress: Adress,
      Gender:Gender
    });
    res.status(201).json({ message: "Created User!" });
  }
}
