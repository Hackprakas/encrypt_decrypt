"use client"
import React from 'react'
import { encrypt } from 'eth-sig-util';

const message = 'Hello, World!';
const encryptionPublicKey = "+KPaILaUYGofR8o/E7f23TamdN0Xk7uVVWqcdY9bxVg=";
const decryptionPublicKey='0xb30585f4c2b942c28cbdf42e387ba6cb9a6da446'

const encryptedMessage = encrypt(encryptionPublicKey, { data: message }, 'x25519-xsalsa20-poly1305');

console.log('Encrypted message:', encryptedMessage);
async function decryptedMessage(){

  const decryptedMessages = await window.ethereum.request({
    method: 'eth_decrypt',
    params: ["btXRswWJu2gJ6yCUaPn6B8Z5ipuMzqbMX9lUUOs=", "0xb30585f4c2b942c28cbdf42e387ba6cb9a6da446"],
  });
  console.log(decryptedMessages)
}
async function connect(){
  await window.ethereum.request({
    "method": "eth_requestAccounts",
    "params": []
  });
}


function page() {
  return (<>
   
    <button className='bg-white text-black' onClick={decryptedMessage}>clickme</button>
    <button className='bg-white text-black' onClick={connect}>connect</button>
  </>
  )
}

export default page