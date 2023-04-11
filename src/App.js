import React from "react";
import './App.css';
import  Login  from "./components/Login";
import Register  from "./components/Register";
import  BusSearchComponent  from "./components/BusSearch";
import  BusReservation  from "./components/BusReservation";
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
function App() {
  //const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/bussearch" element={<BusSearchComponent/>} />
          <Route path="/busreservation" element={<BusReservation/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;