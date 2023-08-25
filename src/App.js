import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home/home';
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
     <Route path='*' element={<div>Not Found</div>}/>
     </Routes>
     </BrowserRouter>



      
      
      
    
    </>
      
  );
}

export default App;
