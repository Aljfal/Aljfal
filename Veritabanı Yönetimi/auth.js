import { hash,compare } from "bcryptjs";

export async function hashPassword(password){
const hashedpassword=await hash(password,12)
return hashedpassword
}

export async function verifypassword(password,hashedPassword){
const isValid= await compare(password,hashedPassword)
return isValid
}