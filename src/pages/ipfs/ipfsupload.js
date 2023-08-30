/* import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import pinataSDK from '@pinata/sdk';


const Ipfsupload = () => {
    const [fileImg, setFileImg] = useState(null);

    const pinata = pinataSDK('3062c835e763833b58fd', '68f8610779bc705598b8884d4385e1eb4915bcafed519601a0a1f3acb6597d16');

    console.log('pinata',pinata)
  
    const sendFileToIPFS = async (e) => {
      e.preventDefault();
      if (fileImg) {
        try {
          const formData = new FormData();
          formData.append("file", fileImg);
          const resFile = await axios(
            {
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                "Content-Type": "multipart/form-data"
              },
            }
          );
          const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
          console.log(ImgHash);
        } catch (error) {
          console.log("Error sending File to IPFS: ")
          console.log(error)
        }
      }
    }


    return (
        <div>

    <form onSubmit={sendFileToIPFS}>
      <input type="file" onChange={(e) => setFileImg(e.target.files[0])} required />
      <button type='submit' >Upload</button>
    </form>
            
        </div>
    );
}

export default Ipfsupload; */


//require('dotenv').config();
/* const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const axios = require('axios');
const FormData = require('form-data');

export  const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export  const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
}; */



/* const uploadFileToIPFS = async(file) => {

  e.preventDefault();
  if (file) {

    try {
      const formData = new FormData();
      formData.append("file", file);

      const resFile = await axios({
        method:"POST",
        url: "https://api.pinata.cloud/pinning/pinFile",
        data: formData,
        headers: {
          pinata_api_key:"8924569680d88d5cc981",
          pinata_secret_api_key:"31b319f8f4d58fb4a904579c9d40e84dd297e59c0b79bb48007768b02808aec4",
          "Content-Type": "multipart/form-data",
        }

      });
      console("kotrol post yapti")

      const ImgHash = ipfs://${resFile.data. IpfsHash};
           signer.add(address, ImgHash);

      
    } catch (error) {
      console.log(e)
    }

  }
}    */







