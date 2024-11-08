import prisma from "../lib/db"
import React from 'react'
import Form from "../components/form";



async function page() {
  const data=await prisma.tests.findMany();
  console.log(data);

  const totalprice = data.reduce((acc, item) => {
    return acc + item.Count * item.price;
}, 0);

  return (<>
   
    <div>{totalprice}</div>
    <Form data={data[0]}/>
    
    

   { data.map((item)=>(
    <div>
      
      <div className="bg-black text-white">{item.id}</div>
      <div>{item.Count} </div>
    </div>
    ))}
  </>
  )
}

export default page