import prisma from "@/app/libs/prismadb";

export interface IListingsParams{
    userId?:string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}


export default async function getListings(
    params:IListingsParams
){
    try{

        // extract userId
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
        } = params;

        let query: any = {};

        if (userId){
            query.userId = userId;
        }

        // category
        if (category){
            query.category = category;
        }

        // roomCount
        if (roomCount){
            query.roomCount = {
                gte: +roomCount
            }
        }

        // guestCount
        if (guestCount){
            query.guestCount = {
                gte: +guestCount
            }
        }        

        // bathroomCount
        if (bathroomCount){
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        // location filter
        if(locationValue){
            query.locationValue = locationValue;
        }

        // filter for dateRange
        if (startDate && endDate) {
            query.NOT = {
              reservations: {
                some: {
                  OR: [
                    {
                      endDate: { gte: startDate },
                      startDate: { lte: startDate }
                    },
                    {
                      startDate: { lte: endDate },
                      endDate: { gte: endDate }
                    }
                  ]
                }
              }
            }
          }



        const listings = await prisma.listing.findMany({
            where: query,
            orderBy:{
                createdAt:'desc'
            }
        });
        // return listings;
        const safeListings = listings.map((listing)=>({
            ...listing,
           createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error:any) {
        throw new Error(error);
    }
}