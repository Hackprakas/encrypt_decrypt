"use client"
import React from 'react'
import { encrypt } from 'eth-sig-util';




const personData = {
  "name": "John Doe",
  "dob": "1990-01-01", 
  "phoneno": "+1234567890", 
  "age": 33,
  "signature":"0x1b2f3d4a5b6c7d8e9f0a1b2c3d4e5f60708090a0b1c2d3e4f5060708090a0b1c "
};

const message = JSON.stringify(personData);
const encryptionPublicKey = "0rBPS+g/Jd7QuXoVXriM+W9oUs/E4L/ytMxSVFiD80g=";

async function fetchs() {
  const details = 'https://ipfs.io/ipfs/bafkreigfvngoydofemwj5x5ioqsaqarvlprzgxinkcv3am3jpv2sysqobi';  
    const response = await fetch(details);

    const datas = await response.json();
    const encryptedMessage = encrypt(encryptionPublicKey, { data: JSON.stringify(datas)}, 'x25519-xsalsa20-poly1305');
    const ciphertext=`0x${Buffer.from(JSON.stringify(encryptedMessage), "utf8").toString("hex")}`;
    decryptedMessage(ciphertext)
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


function page() {
  return (<>

    <button className='bg-white text-black' onClick={fetchs}>clickme</button>
    <button className='bg-white text-black' onClick={connect}>connect</button>
    <button className='bg-white text-black' onClick={decryptedMessage}>decrypt</button>
  </>
  )
}

export default page