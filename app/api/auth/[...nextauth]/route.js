import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });

            session.user.id = sessionUser._id.toString();

            return session;

        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                // user가 이미 존재하는지 확인
                const userExists = await User.findOne({
                    email: profile.email
                });

                // user가 없으면 mongodb에 저장
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (err) {
                console.log("Error during sign in:", err);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };