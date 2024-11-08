"use client";
import { useOptimistic } from "react";
import React from "react";
import { decrease, increase } from "../../../actions/actions2";

interface Props {
    data:{
        id:string;
        Count:number;
    }
}





export default function Form( {data}:Props) {
    const [count, setCount] = useOptimistic(data,(state,todo:any)=>{
        return { ...state, Count: todo.Count };
    });

    async function add(formdata:FormData){
        setCount(count.Count+1);
        const check=await increase();
        if(check.error){
            alert("error")
        }
    }
    async function sub(formdata:FormData){
        // setCount(count.Count-1);
        await decrease();
    }
  return (
    <>
      <form  action={sub}>
        <button type="submit">decrease value</button>
      </form>
      <form>
        <input type="text" defaultValue={count.Count} />
      </form>
      <form action={add}>
        <button type="submit">increase value</button>
      </form>
    </>
  );
}
