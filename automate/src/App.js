import React from 'react';
// import ReactDOM from "react-dom/client";
import './App.css';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from './pages/home'
// import Dispaly from './pages/welcome';
import Deployed from './pages/address';
function App() {
  return (
    <BrowserRouter>
   <Routes>
   {/* <Route path="adr" element={<Deployed />} /> */}
   <Route path="/" element={<Home />} />
   {/* <Route path="/nft" element={<Dispaly />} />   */}

   </Routes>
   </BrowserRouter>
  );
}
export default App;
