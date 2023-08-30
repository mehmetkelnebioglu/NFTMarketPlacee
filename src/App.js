import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar';
import Generatenft from './pages/generatenft/generatenft';
import Home from './pages/home/home';
import Ipfsupload from './pages/ipfs/ipfsupload';
import Listeditems from './pages/listeditems/listeditems';
import Myprofil from './pages/myprofil/myprofil';

function App() {
  return (
    <>

      <Navbar/>
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/Listeditems' element={<Listeditems/>}/>
     <Route path='/Myprofil' element={<Myprofil/> }/>
     <Route path='/Generatenft' element={<Generatenft/> }/>
     <Route path='/uploudtoifps' element={<Ipfsupload/> }/>
     <Route path='*' element={<div>Not Found</div>}/>
     </Routes>
     </BrowserRouter>



      
      
      
    
    </>
      
  );
}

export default App;
