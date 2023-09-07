/* import React, { useContext, useState } from 'react';
import GlobalContext from '../../context/globalcontext'
import 'bulma/css/bulma.css';

const Listeditems = () => {

    const { address,nftMPcontract} = useContext(GlobalContext);
    //console.log("kontrol",address,nftMPcontract)

    const [listeditems, setListeditems] = useState([]);



    const getListedNft = async () =>{
        if(address){
         const number = await nftMPcontract.IdForSale();
         const number1=number.toNumber()
         console.log(number1)
         if(!(number1>0)){
           return ;
         }

         let array = [];
         for(let i = 0; i<number1; i++){
           let info = await nftMPcontract.idToItemForSale(i);
           if(info.state){
             let newItem = {
               0:info.contractAddress,
               1:info.tokenId.toString(),
               2:info.price.toString(),
             }
             array.push(newItem);
             //setListeditems(array)
           }
         }
 
         setListeditems(array)
         console.log("listeditems",listeditems)
        }
     }


    return (
        <div>
           
            <button class="button is-warning" onClick={getListedNft}>Get listed items</button>

        </div>
    );
}

export default Listeditems; */

 
/* import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../context/globalcontext';
import 'bulma/css/bulma.css';

const Listeditems = () => {
    
    const { address, nftMPcontract,nftmintcontrat} = useContext(GlobalContext);
    const [listeditems, setListeditems] = useState([]);

    const getListedNft = async () => {
        if (address && nftMPcontract) {
            const number = await nftMPcontract.IdForSale();
            const number1 = number.toNumber();

            if (!(number1 > 0)) {
                return;
            }
            let array = [];
            for (let i = 0; i < number1; i++) {
                
                let info = await nftMPcontract.idToItemForSale(i);
                console.log("inf",info)
                
                if (info.state) {
                    let newItem = {
                        contractAddress: info.contractAddress,
                        tokenId: info.tokenId.toString(),
                        price: info.price.toString(),
                        media: info.media,
                    };
                    array.push(newItem);
                    
                }
                
                
            }

            
        }

        console.log("listeditems",listeditems)
    };

    const handleBuyNFT = async (contractAddress, tokenId, price) => {
        
    };

    console.log("arr",listeditems)


    return (
        <div>
            <div >
            <h2>MARKET</h2> <br /> 
            <button className="button is-warning" onClick={getListedNft}>
                Get listed items
            </button>

            </div>
            

            <div>
                
                <div className="columns">
                    {listeditems.map((item, index) => (
                        <div key={index} className="column">
                            <div className="card">
                                <div className="card-content">  
                                    {item.media && item.media[0] && item.media[0].raw ? (
                                    <img src={item.media[0].raw} alt={item.tokenId} />
                                ) : (
                                    <p>Picture is not available</p>
                                )}
                                <p>Contract Address: {item.contractAddress}</p>
                                    <p>Token ID: {item.tokenId}</p>
                                    <p>Price: {item.price}</p>
                                    <button
                                        className="button is-success"
                                        onClick={() => handleBuyNFT(item.contractAddress, item.tokenId, item.price)}
                                    >
                                        Buy NFT
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Listeditems; 
 */




import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../context/globalcontext';
import 'bulma/css/bulma.css';
import {ethers} from 'ethers';

const Listeditems = () => {
    
    const { address, nftMPcontract,nftmintcontrat} = useContext(GlobalContext);
    const [listeditems, setListeditems] = useState([]);

     const getListedNft = async () => {
        if (address && nftMPcontract) {
            const number = await nftMPcontract.IdForSale();
            const number1 = number.toNumber();
            console.log("sayi",number1)

            if (!(number1 > 0)) {
                return;
            }
            let array = [];
            for (let i = 0; i < number1; i++) {
                
                let info = await nftMPcontract.idToItemForSale(i);
                console.log("inf",info)
                 
                if (!info.state) {
                    let newItem = {
                        contractAddress: info.contractAddress,
                        tokenId: info.tokenId.toString(),
                        price: info.price.toString(),
                        salesId : i,
                        media: info.media,
                    };
                    array.push(newItem);
                    
                }
                
                
            }
                console.log("arr",array)
                setListeditems(array);
            
        }
    }; 

    const handleCancelNFTsales = async (contractAddress, tokenId, price ,salesId) =>{
        console.log("salesid",salesId)
         try {
            await (await nftMPcontract.cancelNFTSale(salesId,{
                gasLimit:300000})).wait()
                console.log("cancel is succesfull")
                alert("cancel is succesfull tokenId:"+ tokenId)
            
        } catch (err) {
            console.log("err",err)
        } 

    }

    const handleBuyNFT = async (contractAddress, tokenId, price ,salesId) => {
        console.log("id",tokenId)
        console.log("price",price)
        console.log("salesid",salesId)
        //const salesId1 = ethers.utils.parseEther(salesId.toString())
        //const price1 = ethers.utils.parseEther(price.toString())
        //await(await nftmintcontrat.setApprovalForAll("0xe1AB8d1e3baD0816b5B72F71Cf84c3936088834c", true)).wait()

         try {
            await (await nftMPcontract.buyNFT(salesId,{
                gasLimit: 300000,value:price})).wait()
                console.log("buying is succesfull")
                alert("buying is succesfull tokenid:" + tokenId)
            
        } catch (err) {
            console.log("err",err)
        } 
        
        
    };

    console.log("arr",listeditems)


    return (
        <div>
            <div >
            <h2>MARKET</h2> <br /> 
            <button className="button is-warning" onClick={getListedNft}>
                Get listed items
            </button>

            </div>
            

            <div>
                
                <div className="columns">
                    {listeditems.map((item, index) => (
                        <div key={index} className="column">
                            <div className="card">
                                <div className="card-content">  
                                    {item.media && item.media[0] && item.media[0].raw ? (
                                    <img src={item.media[0].raw} alt={item.tokenId} />
                                ) : (
                                    <p>Picture is not available</p>
                                )}
                                <p>Contract Address: {item.contractAddress}</p>
                                    <p>Token ID: {item.tokenId}</p>
                                    <p>Price: {item.price}</p>
                                    <p>salesId: {item.salesId}</p>
                                    <button
                                        className="button is-success"
                                        onClick={() => handleBuyNFT(item.contractAddress, item.tokenId, item.price, item.salesId)}
                                    >
                                        Buy NFT
                                    </button> 
                                    <button className="button is-danger" onClick={() => handleCancelNFTsales(item.contractAddress, item.tokenId, item.price, item.salesId)}
                                     >cancel the NFt sales </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Listeditems;

