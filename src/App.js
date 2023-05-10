import React from "react";

import  Login  from "./components/Login.component";
import Register  from "./components/Register";
import  BusSearchComponent  from "./components/BusSearch";
import  BusReservation  from "./components/BusReservation";
import HeaderComponent from "./components/Header";
import UpdateBooking from "./components/UpdateBookings";
import { Routes,Route, useLocation} from 'react-router-dom';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";        
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";  
import  BusRequest  from "./components/BusRequest";


import UserBookings from "./components/UserBookings";
         
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
              <Route path="/bookings" element={<UserBookings/>}/>
              <Route path="/updatebookings" element={<UpdateBooking/>}/>
              <Route path="/busrequest" element={<BusRequest/>}/>
            </Routes>
        )}
    
    </div>
  );
}

export default App;