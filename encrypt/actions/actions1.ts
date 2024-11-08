"use server"


export async function getname(){
    
    const encoder = new TextEncoder();

  const customReadable = new ReadableStream({
    async start(controller) {
      try {
        // Task 1
        await Timeouts1();
        controller.enqueue(encoder.encode(JSON.stringify({ 
          status: 'Task 1 completed', 
          progress: 33 
        }) + '\n'));

        // Task 2
        await Timeouts2();
        controller.enqueue(encoder.encode(JSON.stringify({ 
          status: 'Task 2 completed', 
          progress: 66 
        }) + '\n'));

        // Task 3
        await Timeouts3();
        controller.enqueue(encoder.encode(JSON.stringify({ 
          status: 'Task 3 completed', 
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

  return new Response(customReadable, {
    headers: {
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked'
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
    }
async function Timeouts3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        resolve("timeout3")
        },2000)
    })
    }