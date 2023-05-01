import React from "react";

import  Login  from "./components/Login.component";
import Register  from "./components/Register";
import  BusSearchComponent  from "./components/BusSearch";
import  BusReservation  from "./components/BusReservation";
import HeaderComponent from "./components/Header";
import { Routes,Route, useLocation} from 'react-router-dom';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";        
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";                                         
         
function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';
  return (
    <div className="App">
     
        {isAuthPage ? (
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
          </Routes>
        ) : (
          
            <Routes>
              <Route path="/booking/:bus_id" element={<BusSearchComponent/>} />
              <Route path="/busreservation" element={<BusReservation/>} />
              <Route path="/header" element={<HeaderComponent/>} />

            </Routes>
        )}
    
    </div>
  );
}

export default App;