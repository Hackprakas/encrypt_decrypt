"use client"
import { getname } from '../../actions/actions1';
import { useState } from 'react';
import Button from "../app/components/button"


  
  function page() {
    const[name,setName]=useState("");
    async function fetchs(e) {
      e.preventDefault();
      const names="prakash";
       const response = await fetch('./api/ipf/', {
        method: 'POST',
        body:JSON.stringify({names})
      })
      if (!response.ok) {
        throw new Error("something");
      }
      const responses=await response.json();
      console.log(responses.data.names);
      const result=responses.data.names;
      setName(result)
    }

    async function hello(e){
      e.preventDefault();
      const detail=await getname("prakash");
      console.log(detail)
      setName(detail)
    }

  
  
  return (<>

  <form onSubmit={hello}>
<input type="text" name="name" placeholder='enter here'/>
   <Button/>
   <button onClick={console.log(name)}>hey</button>
  </form>
  </>
  )
}

export default page