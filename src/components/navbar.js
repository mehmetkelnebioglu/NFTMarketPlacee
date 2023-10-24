import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import Logo from '../assets/logo.svg'
import GlobalContext from '../context/globalcontext';



const Navbar = () => {

    const{address,signer, provider,balance,connectMetamask} = useContext (GlobalContext)
    
    


    return (
        <div>

            <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">

                  <a className="navbar-item" href="https://www.linkedin.com/in/mehmetk1/" target="blank">
                    <img src={Logo} alt="" />
                   <section className='section'>
                    <p className="title">
                     NFT Market Place
                    </p>
                   </section>
                  </a>

                 <a role="button" className="navbar-burger" href='#' aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                 </a>

                </div>

                <div id="navbarBasicExample" className="navbar-menu ">
                  <div className="navbar-start">
                     <a className="navbar-item" href='http://localhost:3000/' >  
                        Home
                    </a>
                    
                    <a className="navbar-item" href='http://localhost:3000/Myprofil'>
                        My Profil
                   </a>
                    
            
                    <a className="navbar-item" href='http://localhost:3000/listeditems'>
                        Listed Items
                   </a>

                   <a className="navbar-item" href='http://localhost:3000/Generatenft'>
                        Generate & List NFT 
                   </a>

                   {/* <a className="navbar-item" href='http://localhost:3000/uploudtoifps'>
                   up loudtoifps
                   </a> */}
                    
                   

     
                  </div>

                  <div className="navbar-end">
                    <div className="navbar-item">
                     <div className="buttons">
                       <a className="button  is-warning"  href="#" onClick={connectMetamask} >
                        <strong>{address}</strong>
                       </a>
                        
                       <a className="button  is-warning"  href="#"  >
                        <strong>{balance} eth</strong>
                       </a>

                     </div>
                    </div>
                  </div>

                </div>
          </nav>
            </div>
            
        </div>
    );
}

export default Navbar;
