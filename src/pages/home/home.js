import React, { useContext } from 'react';
import GlobalContext from '../../context/globalcontext';

const Home = () => {

    const{name,address,signer, provider,balance} = useContext (GlobalContext)


    return (
        <div>
            {name} <br />
            {address}
            
        </div>
    );
}

export default Home;
