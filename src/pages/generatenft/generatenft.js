 import React, { useContext, useState } from 'react';
import 'bulma/css/bulma.css';
import GlobalContext from '../../context/globalcontext';
//import { uploadFileToIPFS, uploadJSONToIPFS } from "../ipfs/ipfsupload";
//console.log("amk ko",uploadFileToIPFS)
import { ethers } from 'ethers';
import axios from 'axios';

const Generatenft = () => {

   const {address,nftmintcontrat,nftMPcontract,signer} = useContext(GlobalContext);

  const [formParams,  setformParams] = useState({name:"",description:"",price:""});
  const [fileURL, setFileURL] = useState (null) ;
  const [message, updateMessage] = useState("");
  const [file, setfile] = useState("")



  const key = "8924569680d88d5cc981";//process.env.REACT_APP_PINATA_KEY;
  //console.log("key",key)
  const secret = "31b319f8f4d58fb4a904579c9d40e84dd297e59c0b79bb48007768b02808aec4";//process.env.REACT_APP_PINATA_SECRET;
  //console.log("key",secret)

  //const axios = require('axios');
  const FormData = require('form-data');

   const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
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




  const uploadFileToIPFS = async(file) => {
    console.log(file.name)
    setfile(file.name)
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    //console.log("data",data)
    data.append('file', file);
    console.log("aploadFileToIPFS",data.get('file'))
    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    console.log("metadata",metadata)

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

    console.log("pinataOptions",pinataOptions)
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
            console.log("axios hatasi", error)
            return {
                success: false,
                message: error.message,
            }

    });
};  
// asil




//yedek
/* const uploadFileToIPFS = async(file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const headers = {
    'pinata_api_key': key,
    'pinata_secret_api_key': secret,
  };
  const body = {
    file: file,
    pinataMetadata: JSON.stringify({
      name: 'testname',
      keyvalues: {
        exampleKey: 'exampleValue'
      }
    }),
    pinataOptions: JSON.stringify({
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
    }),
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'no-cache',
  });

  console.log("uploadFileToIPFSres", response)

  if (response.status === 200) {
    const data = await response.json();
    console.log("image uploaded", data.IpfsHash);
    return {
      success: true,
      piñataURL: "https://gateway.pinata.cloud/ipfs/" + data.IpfsHash
    };
  } else {
    console.log(response.statusText);
    return {
      success: false,
      message: response.statusText,
    };
  }
}; */







  
   const ipfsfile = async (e)=>{

    let file = e.target.files[0]
     console.log('file', file)

      try {
        const response = await uploadFileToIPFS(file);
        console.log("ipfsfileres",response)
        if (response.success === true) {
         console.log ("Uploaded image to Pinata:", response.pinataURL) 
        setFileURL(response.pinataURL) ;
        setformParams({...formParams, file: response.pinataURL});
        console.log("ipfsfilecalisti")

        
      }
   } catch(e) {
      console.log ("Error during file upload", e)
  } 

 } 

   const uploadMetadataToIPFS = async ()=> {
    const {name, description , price} = formParams;
    console.log("formparams",formParams)
    if(!name || !description ||  !price || !fileURL){
      return;
    }

    const nftJSON = {
      name, description, price, image :fileURL
    }

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if(response.success === true ) {
        console.log("uploaded json to IPFS ", response)
        return  response.pinataURL;
      }
    } catch (e){
      console.error ('error uploading metadata ', e );
    }
        
   } 



   const generateNFT= async (e) =>{
        e.preventDefault()

       try {


           const metadataURL = await uploadMetadataToIPFS();
           console.log("metadataURL",metadataURL)

           updateMessage("please wait uploading ")

           console.log("nftmintcontrat",nftmintcontrat)
           await(await nftmintcontrat.mint(metadataURL)).wait()
           const id = await nftmintcontrat.tokenCount()
           await(await nftmintcontrat.setApprovalForAll("0xbD4e8327915539b4A3841B605E012bDa415d26e9", true)).wait()
            
            const listingPrice = ethers.utils.parseEther(formParams.price.toString())
            await(await nftMPcontract.starNFTSale('0x56b9CFa98051F8650F1eC45831841d054900FaF8',listingPrice,id,{
              gasLimit: 300000,
            })).wait() 
          
            alert("succcessfuly listed your nft tokenid:" + id );
            updateMessage("")
            setformParams({name:"",description:"",price:""}) 
            
          
  } catch (e) {

   console.log('upload error',e)
    
  }

 } 
 

 
  /* const deneme = async()=>{
    const metadataURL=`https://www.facebook.com/`
    
    
         console.log("formParams",typeof formParams.price)
        const mp = await nftMPcontract.owner()
        console.log("mp",mp)
        const nft = await nftMPcontract.IdForSale()
        console.log("nft",nft.toNumber())
      await(await nftmintcontrat.mint(metadataURL)).wait()
      const id = await nftmintcontrat.tokenCount() 
      console.log("token sayisi",id,id.toNumber())
      await(await nftmintcontrat.setApprovalForAll("0xbD4e8327915539b4A3841B605E012bDa415d26e9", true)).wait()
       
       const listingPrice = ethers.utils.parseEther(formParams.price.toString())
       console.log("listprice",listingPrice) 

       const nftContractAddress = '0x56b9CFa98051F8650F1eC45831841d054900FaF8';
       await(await nftMPcontract.starNFTSale(nftContractAddress,listingPrice,id,{
        gasLimit: 300000,
      })).wait() 
     
       alert('your nft succcessfuly listed your nft tokenid:'+id);
       updateMessage("")
       setformParams({name:"",description:"",price:""}) 

      
  } */


  return (
    <div>

    <div style={{padding:"150px"}}>

        <div class="file has-name">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" onChange={ipfsfile}/>
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
            <span class="file-name">
             {file}
            </span>
          </label>
        </div>

    

        <div class="field">
         <label class="label">Name</label>
         <div class="control has-icons-left has-icons-right">
         <input class="input is-success" type="text" placeholder="Name" onChange={e => setformParams({...formParams, name: e.target.value})} value={formParams.name}/>
         </div>
         </div>

         <div class="field">
           <label class="label">Description</label>
           <div class="control has-icons-left has-icons-right">
             <input class="input is-success" type="text" placeholder="Description" value={formParams.description} onChange={e => setformParams({...formParams, description: e.target.value})} />
           </div>
           
         </div>

         <div class="field">
           <label class="label">Price</label>
           <div class="control has-icons-left has-icons-right">
             <input class="input is-success" type="number" placeholder="Price" value={formParams.price} onChange={e => setformParams({...formParams, price: e.target.value})} />
           </div>
         </div>

         <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" onClick={generateNFT}>Generate NFT</button>
              </div>
         </div>

         {/* <button onClick={deneme}>deneme</button> */}

    </div> 
    </div>
  );
}

export default Generatenft;









  









