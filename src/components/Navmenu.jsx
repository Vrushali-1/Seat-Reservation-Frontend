import { Menubar } from 'primereact/menubar';
import bus from "../images/bus.jpg";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'primereact/tooltip';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
        
export const Navmenu = () => {
    const items = [];
    const [isRequest, setIsRequest] = useState(false);
    const start = <div><Link to="/busreservation">
    <img alt="logo" src=  {bus} height="40" className="mr-2"></img></Link>
    {!isRequest && <Link to="/busrequest"> <Button style={{ marginLeft: '1.5rem'}}className="bus-request" type="button" icon="pi pi-plus" severity="info" rounded data-pr-tooltip="Bus Request" data-pr-position="right"  /></Link>}
    <Tooltip target=".bus-request" />
</div>;

useEffect(() => {
  if(window.location.pathname === '/busrequest'){
    setIsRequest(true);
  }
},[]);
    
    const navigate = useNavigate();

    const myBooking = () => {
        navigate('/bookings');
    }

    const logout = () => {
        localStorage.removeItem("user");
        navigate('/');
    }

    const end =  <Dropdown  text="dropdown" >
    <Dropdown.Toggle variant="success" id="dropdown-basic">
       {<i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>}
     </Dropdown.Toggle>
      <Dropdown.Menu>
      <Dropdown.Item onClick={myBooking}>My Bookings</Dropdown.Item>
      <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>;

    return (
      <Menubar model={items} start={start} end={end} />   
    )
}
export default Navmenu;