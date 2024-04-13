"use client"
import { getname } from '../../actions/actions1';
import { useState } from 'react';
import Button from "./components/button"
import { getnames } from '../../actions/actions2';


  
  function page() {
    const[name,setName]=useState("");
    async function fetchs(e) {
      e.preventDefault();
      const names="prakash";
       const response = await fetch('./api/ipf/', {
        method: 'GET',
        // body:JSON.stringify({names})
      })
      if (!response.ok) {
        throw new Error("something");
      }
      const responses=await response.json();
      console.log(responses);
      // const result=responses.data.message;
      // setName(result)
    }

    async function hello(){
      // "use server"
      const detail=await getname("prakash");
      const res=await getnames(detail)
      console.log(detail)
      console.log("res"+res);
      setName(res)
    }

  
  
  return (<>

  <form action ={hello}>
<input type="text" name="name" placeholder='enter here'/>
   <Button/>
   {/* <button onClick={console.log(name)}>hey</button> */}
   <button onClick={()=>alert(name)}>fetch</button>
    <h1>{name}</h1>
  </form>
  </>
  )
}

export default page