
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:Request,res:Response) {
  try {
    // const data = await req.json()
    // console.log(data);

    // Do something with the data (processing or saving to a database, for example)

    return NextResponse.json({ message: "Hello, World!"});
  } catch (error) {
    console.error(error);
    
  }
}
