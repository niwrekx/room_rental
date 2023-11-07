import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// define custom post

export async function POST (
    // post will provide a request
    request: Request
) {
    // inject the body
    const body = await request.json();
    // extract all fields needed from body
    const {
        email,
        name,
        password
    } = body;
     
    // hashedpassword
    const hashedPassword = await bcrypt.hash(password, 12);

    // create the user with data (email,name, hashedPassword)
    const user = await prisma.user.create({
        data :{
            email,
            name,
            hashedPassword
        }
    })
    // return the response
    return NextResponse.json(user);
}