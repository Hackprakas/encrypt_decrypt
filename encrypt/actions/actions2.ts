"use server"
import { revalidatePath } from "next/cache"
import prisma from "../src/app/lib/db"

export async function increase(){
    try{

        await prisma.tests.create({
            data:{

                Count:1,
                price:100
            }
        })
        return {
            success:"success"
        }
    }
    catch(e){
        return {
            error:"error"
        }
    }
    finally{

        revalidatePath("/new")
    }
    
   
}

export async function decrease(){
        
        await prisma.tests.update({
            where:{
                id:"cly33ftot00009nopzfo6wy0i",
            },
            data:{
                Count:{
                    decrement:1
                },
            }
        })
        revalidatePath("/new")
    }