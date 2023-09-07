
import { createContext, useEffect, useMemo, useState } from "react";
import {Contract, ethers} from 'ethers';
import Nftmarketplace from '../contrats/nftmarketplace.json'
import Nftmint from '../contrats/nftmint.json'
import { MetaMaskSDK } from '@metamask/sdk';


const GlobalContext = createContext();

 function Provider ({children}) {
    
    const name ='mehmet contexten gelen'
    const deger ="bu deger contexten gelen listed item degeridir"

    const [provider, setProvider] = useState("");
    const [signer, setSigner] = useState("")
    const [address, setAddress] = useState("address")
    const [balance, setBalance] = useState("Connect metamask")
    const [nftMPcontract, setNftMPcontract] = useState(null);
    const [nftmintcontrat, setNftMintContrat] = useState(null)
    const [listeditems, setListeditems] = useState(null);
   



    useEffect(() => {

        (async()=>{
            const eth = window.ethereum || null;
           /*  console.log("eth", eth) */

            const provider = eth ? new ethers.providers.Web3Provider(eth) : alert ('please install metamask')
            setProvider(provider)
            /* console.log("providerr",provider) */

            if(provider){
                    

                (async () => {
                     await provider.send("eth_requestAccounts", []);
                    const _signer =  provider.getSigner();
                    setSigner(_signer)
                    console.log("signer",_signer)
                    const   address = (await _signer.getAddress()) || null;
                    console.log("add",address)
/* 
                   (async()=>{
                    const provider = new ethers.providers.JsonRpcProvider();
                   const contract = new ethers.Contract("0xbD4e8327915539b4A3841B605E012bDa415d26e9", Nftmarketplace.abi, provider);

                    console.log("kontrat", contract);

                   })() */




                    
                     if(address){
                         const balance =  await provider.getBalance(address);
                         setBalance( ethers.utils.formatEther(balance));
                         setAddress (address);   
                         
                    } 


                    const Nftmintt  = new ethers.Contract(
                      '0x56b9CFa98051F8650F1eC45831841d054900FaF8',
                      Nftmint.abi,
                      _signer
                  ); 
                  setNftMintContrat(Nftmintt)
                  console.log("nftmincontrat",Nftmintt)



    
                       const Nftmarketplacee  =   new ethers.Contract(
                        '0xbD4e8327915539b4A3841B605E012bDa415d26e9',
                        Nftmarketplace.abi,
                        _signer
                    );  
                    setNftMPcontract(Nftmarketplacee )
                    console.log("nftmarketplace",Nftmarketplacee)


                  
    
                })()
            }

            
        

        }) ()
        

    }, []);


  /*   const price = 10
   const _price =  ethers.utils.parseEther(price.toString())
   console.log('fiyat',_price) */


    const startNFTSale = async (_contratAddress,_price,_tokenId)=>{
      _contratAddress = "0xbD4e8327915539b4A3841B605E012bDa415d26e9"

      const state = await nftmintcontrat.getApproved(_tokenId)
      if(state === "0xbD4e8327915539b4A3841B605E012bDa415d26e9" ){
        await nftMPcontract.startNFTSale(_contratAddress,_price,_tokenId)
      }else{
        await nftMPcontract.approve(_contratAddress,_price,_tokenId)
      }

    }

    const getListedNft = async () =>{
       if(address){
        const number = await nftMPcontract.IdForSale();
        if(!(number>0)){
          return ;
        }

        let array = [];
        for(let i = 0; i<number; i++){
          let info = await nftMPcontract.idToItemForSale(i);
          if(!info.state){
            let newItem = {
              0:info.contractAddress,
              1:info.tokenId.toString(),
              2:info.price.toString(),
            }
            array.push(newItem);
          }
        }

        setListeditems(array)
        console.log("listeditems",listeditems)
       }
    }


    const connectMetamask = async() =>{
        
        try {
            await provider.send("eth_requestAccounts", []); 
        const _singner = await provider.getSigner();
        setSigner(_singner)
        const _address = await _singner.getAddress();
        setAddress(_address);
         /*  const chainId =  await window.ethereum.request({method : 'eth_chainId'})
          if(chainId !== "11155111"){
            // alert('Please switch to Rinkeby network')

            await window.ethereum.request({
              method:'wallet_switchEthereumChain',
              params: [{chainId:"11155111"}]
            })
          } */


        const __balance= await provider.getBalance(_address)
        setBalance(ethers.utils.formatEther(__balance))
        console.log("blc",balance)

          /*   ( try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x11155111' }],
            });
          } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x11155111',
                      chainName: 'Sepolia test network',
                      rpcUrls: ['https://sepolia.infura.io/v3/'] ,
                    },
                  ],
                });
              } catch (err) {
                console.log("sepoli id ",err)
              }
            }
            // handle other "switch" errors
          }) */

            
        } catch (err) {
            console.log(err)
        }

    }

    const sharedValues = useMemo(() => {
      return {
        name,  
        deger, 
        provider , 
        signer,
        address,
        balance,
        nftMPcontract,
        nftmintcontrat,
        connectMetamask,
        startNFTSale,
        getListedNft,
      };
    }, [provider, signer, address, balance,nftMPcontract,nftmintcontrat]);

   

    return (
        <GlobalContext.Provider value={sharedValues}>
        {children}
        </GlobalContext.Provider>
    )
}  

 export { Provider};
 export default GlobalContext;




 //nftmarketplacecontractadress=0xbD4e8327915539b4A3841B605E012bDa415d26e9
 //nftcontract= 0x56b9CFa98051F8650F1eC45831841d054900FaF8

 
                    
                     