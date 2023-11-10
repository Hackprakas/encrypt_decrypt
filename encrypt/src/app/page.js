"use client"
import React from 'react'
import { encrypt } from 'eth-sig-util';

const personData = {
  "name": "John Doe",
  "dob": "1990-01-01", // Date of Birth in YYYY-MM-DD format
  "phoneno": "+1234567890", // Placeholder phone number
  "age": 33
   // Placeholder age
};

const message = JSON.stringify(personData);
const encryptionPublicKey = "0rBPS+g/Jd7QuXoVXriM+W9oUs/E4L/ytMxSVFiD80g=";
// const decryptionPublicKey='0xb30585f4c2b942c28cbdf42e387ba6cb9a6da446'

const encryptedMessage = encrypt(encryptionPublicKey, { data: message }, 'x25519-xsalsa20-poly1305');
const ciphertext=`0x${Buffer.from(JSON.stringify(encryptedMessage), "utf8").toString("hex")}`;

console.log(`encrypted message: 0x${Buffer.from(JSON.stringify(encryptedMessage), "utf8").toString("hex")}`);
async function decryptedMessage() {

  const decryptedMessages = await window.ethereum.request({
    method: 'eth_decrypt',
    params: [ciphertext, "0xb30585f4c2b942c28cbdf42e387ba6cb9a6da446"],
  });
  console.log(decryptedMessages)
}
async function connect() {
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