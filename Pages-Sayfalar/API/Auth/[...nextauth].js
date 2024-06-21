import Login from "@/Data/Login";
import { connectToDB } from "@/mongodb";
import { verifypassword } from "@/mongodb/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDB();
        const user = await Login.findOne({ Mail: credentials.Mail });
        
        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await verifypassword(
          credentials.Password,
          user.Password
        );
        if (!isValid) {
          throw new Error("Wrong Password");
        }
        return user;
      },
    }),
  ],
  callbacks:  {
    async session({ session, user, token }) {
  
      return{
        ...session,
        user:{
          type:token.type,
          name:token.name,
          id:token.id,
        }
      }
    },
    async jwt({ token, user, session }) {

      if(user){
        return{
          ...token,
          id:user._id,
          type:user.type,
          name:user.username,
        }
      }
      return token
    }
}
});