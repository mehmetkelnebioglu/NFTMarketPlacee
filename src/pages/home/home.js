import React, { useContext } from 'react';
import GlobalContext from '../../context/globalcontext';
import 'bulma/css/bulma.css';




const Home = () => {

    const{name,address,signer, provider,balance} = useContext (GlobalContext)


    return (
        <div className='home'>

            <p> WELCOME TO THE NFT MARKET PLACE </p> 
            <p style={{}}>You can genrate and sell your NFT also You can buy a nft from maket place </p>
            
        </div>
    );
}

export default Home;
