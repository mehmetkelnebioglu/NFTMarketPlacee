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


import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../context/globalcontext';
import 'bulma/css/bulma.css';

const Listeditems = () => {
    const { address, nftMPcontract } = useContext(GlobalContext);
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
                if (info.state) {
                    let newItem = {
                        contractAddress: info.contractAddress,
                        tokenId: info.tokenId.toString(),
                        price: info.price.toString(),
                    };
                    array.push(newItem);
                }
            }

            setListeditems(array);
        }

        
    };

    const handleBuyNFT = async (contractAddress, tokenId, price) => {
        // Burada satın alma işlemi için gerekli kodu ekleyebilirsiniz.
        // Örneğin, bir fonksiyon çağrısı gibi.
    };

    useEffect(() => {
        getListedNft();
    }, []);
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
