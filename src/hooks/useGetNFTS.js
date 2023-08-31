
import GlobalContext from '../../context/globalcontext';
import { Network, Alchemy } from "alchemy-sdk";




export const useGetNFTs = () =>{

    const{address} = useContext (GlobalContext)

    const settings = {
        apiKey: 'EmKwl1-viETOwC8QSBPU3cVLxSnULLQD', // Replace with your Alchemy API Key.
        network: Network.ETH_SEPOLIA, // Replace with your network.
      };
      
      const alchemy = new Alchemy(settings);

      const getNFTs = async () => {
        const nftsForOwner = alchemy.nft.getNftsForOwner(address);
        console.log(nftsForOwner)
      }


}



// Optional Config object, but defaults to demo api-key and eth-mainnet.
