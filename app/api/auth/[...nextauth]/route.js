import NextAuth from "next-auth";
import { Profile, Session, SessionOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@/utils/db';
import User from "@/models/user"


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  callbacks: {
    async session({ session }) {
  
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });

      // Assuming sessionUser has a known structure defined by IUser
      const customUser = {
        ...session.user,
        id: sessionUser._id.toString(),
      };

      session.user = customUser;
  
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
  
        const userExists = await User.findOne({
          email: profile?.email
        })
    
        if(!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            image: profile?.image,
          })
        }
  
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }
})

export { handler as GET, handler as POST };
