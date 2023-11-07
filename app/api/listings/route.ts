import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request, 
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }
    // extract body
    const body = await request.json();
    const{
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    // check if one the item extracted from body is missing
    Object.keys(body).forEach((value:any)=>{
        if(!body[value]) {
            NextResponse.error();
        }
    });

    // creating the listing
    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });
    return NextResponse.json(listing);
}