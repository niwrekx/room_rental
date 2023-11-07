//way to know a user is login

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";


// function to get the session
export async function getSession(){
    return await getServerSession(authOptions);
}

//get current user function
export default async function getCurrentUser(){
    try{
        // initiate session from server components
        const session = await getSession();

        // check user is correct
        if(!session?.user?.email){
            return null;
        }

        // find the current user
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        // if there is no user
        if(!currentUser) {
            return null;
        }

        //when all items had passed
        return {
            // convert DateTime into ISOString ex. 05 October 2011 14:48 UTC then return into 2011-10-05T14:48:00.000Z
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            upatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    }catch (error: any){
        return null;
    }
};