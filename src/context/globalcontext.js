
import { createContext, useEffect, useMemo, useState } from "react";
import {ethers} from 'ethers';
import Nftmarketplace from '../contrats/nftmarketplace.json'


const GlobalContext = createContext();

 function Provider ({children}) {
    
    const name ='mehmet contexten gelen'
    const deger ="bu deger contexten gelen listed item degeridir"

    const [provider, setProvider] = useState("");
    const [signer, setSigner] = useState("")
    const [address, setAddress] = useState("address")
    const [balance, setBalance] = useState("Connect metamask")
    const [nftMPcontract, setNftMPcontract] = useState(null);



    useEffect(() => {

        (async()=>{
            const eth = window.ethereum || null;
           /*  console.log("eth", eth) */

            const provider = eth ? new ethers.providers.Web3Provider(eth) : alert ('please install metamask')
            setProvider(provider)
            /* console.log("providerr",provider) */

            if(provider){

                (async () => {
                    const _signer =  provider.getSigner();
                    setSigner(_signer)
                    const   address = (await _signer.getAddress()) || null;
                    
                    
                     if(address){
                         const balance =  await provider.getBalance(address);
                         setBalance( ethers.utils.formatEther(balance));
                         setAddress (address);
                         
                         
                    } 
    
                       const Nftmarketplacee  =   new ethers.Contract(
                        '0xbD4e8327915539b4A3841B605E012bDa415d26e9',
                        Nftmarketplace.abi,
                        _signer
                    );  
                    /* console.log("mpc",Nftmarketplacee) */
                    setNftMPcontract(Nftmarketplacee )
                    
    
                })()
            }

            
        

        }) ()
        

    }, []);


    const connectMetamask = async() =>{
        
        try {
            await provider.send("eth_requestAccounts", []); 
        const _singner = await provider.getSigner();
        setSigner(_singner)
        const _address = await _singner.getAddress();
        setAddress(_address);
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
        connectMetamask,
      };
    }, [provider, signer, address, balance,nftMPcontract,]);

   

    return (
        <GlobalContext.Provider value={sharedValues}>
        {children}
        </GlobalContext.Provider>
    )
}  

 export { Provider};
 export default GlobalContext;




 //nftmarketplacecontractadress=0xbD4e8327915539b4A3841B605E012bDa415d26e9