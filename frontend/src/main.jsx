import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Route,Routes} from  'react-router-dom'
import { HomeView } from './views/HomeView'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeView/>}/>
      <Route path="*" element={<h1 className="text-center mt-5 text-light">La pagina a la que tratas de acceder no existe</h1>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
