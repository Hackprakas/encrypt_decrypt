import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const encoder = new TextEncoder();
  
    const stream = new ReadableStream({
      async start(controller) {
        try {
                 
           const result= await Timeouts1();
            controller.enqueue(encoder.encode(JSON.stringify({ 
              status: result, 
              progress: 33 
            }) + '\n'));
    
          
         
         const result2= await Timeouts2();
          controller.enqueue(encoder.encode(JSON.stringify({ 
            status: result2, 
            progress: 66 
          }) + '\n'));
  
          
         const result3= await Timeouts3();
          controller.enqueue(encoder.encode(JSON.stringify({ 
            status: result3, 
            progress: 100 
          }) + '\n'));
  
          controller.close();
        } catch (error) {
          controller.enqueue(encoder.encode(JSON.stringify({ 
            error: error.message 
          }) + '\n'));
          controller.close();
        }
      }
    });
  
    return new Response(stream, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        // 'Connection': 'keep-alive'
      }
    });
  }


async function Timeouts1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        resolve("timeout1")
        },2000)
    })
    }
async function Timeouts2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        resolve("timeout2")
        },2000)
    })
    // throw new Error("timeout2")
    }
async function Timeouts3(){
    const data= await fetch("https://jsonplaceholder.typicode.co")
    console.log(data)
    return data;
    // throw new Error("timeout3")
    }