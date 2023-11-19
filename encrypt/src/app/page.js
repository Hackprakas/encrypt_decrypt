"use client"
import React from 'react'
import { encrypt } from 'eth-sig-util';
const encryptionPublicKey = "0rBPS+g/Jd7QuXoVXriM+W9oUs/E4L/ytMxSVFiD80g=";

async function fetchs() {
   const response = await fetch('./api/ipf', {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }); 
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

async function decryptedMessage(text) {
   const decryptedMessages = await window.ethereum.request({
    method: 'eth_decrypt',
    params: [text, "0xb30585f4c2b942c28cbdf42e387ba6cb9a6da446"],
  });
  console.log(decryptedMessages)
}
async function connect() {
  await window.ethereum.request({
    "method": "eth_requestAccounts",
    "params": []
  });
}
async function getdata(){
   const data=await fetchs();
   const encryptedMessage = encrypt(encryptionPublicKey, { data: JSON.stringify(data)}, 'x25519-xsalsa20-poly1305');
    const ciphertext=`0x${Buffer.from(JSON.stringify(encryptedMessage), "utf8").toString("hex")}`;
    decryptedMessage(ciphertext)
    console.log(data)
 }

function page() {
  return (<>
    <button className='bg-white text-black' onClick={getdata}>get data and decrypt</button>
    <button className='bg-white text-black' onClick={connect}>connect</button>
  </>
  )
}

export default page