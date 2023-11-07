import bcrypt from "bcrypt";
import NextAuth,{ AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials:{
                email:{label:'email',type: 'text'},
                password:{ label: 'password', type:'password'},
            },
            async authorize (credentials){
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                // finding the user
                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                // check if the user exists
                if (!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials');
                }
                // check and compare password is correct
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                // when password is not match to hashpassword
                if (!isCorrectPassword){
                    throw new Error('Invalid credentials');
                }
                return user;
            }
        })
    ],
    pages:{
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);