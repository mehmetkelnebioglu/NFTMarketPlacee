import React, { useContext } from 'react';
import GlobalContext from '../../context/globalcontext';
import 'bulma/css/bulma.css';

const Listeditems = () => {

    const{deger,listeditems} = useContext(GlobalContext)


    return (
        <div>
            {deger} <br />
            <button class="button is-warning">Get listed items</button>

        </div>
    );
}

export default Listeditems;
