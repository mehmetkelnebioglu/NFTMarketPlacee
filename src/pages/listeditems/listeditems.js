import React, { useContext } from 'react';
import GlobalContext from '../../context/globalcontext';

const Listeditems = () => {

    const{deger} = useContext(GlobalContext)


    return (
        <div>
            this is listed items page <br />
            {deger}

        </div>
    );
}

export default Listeditems;
