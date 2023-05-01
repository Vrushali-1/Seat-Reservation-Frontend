
import { useEffect, useState } from 'react';
import Navmenu from '../components/Navmenu';
import HeaderComponent  from '../components/Header';
import { getBookingByUser } from '../services/bookingService';
import { Button } from 'primereact/button';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        

const UserBookings = (props) => {
    const [bookings, setBookings] = useState([]);
    const [user,setUser] = useState(null);
    
    useEffect(() => {
        getBookings();
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [props]);
    console.log('user',user);
    const getBookings = async () => {
        const response = await getBookingByUser(user.student_id);
        setBookings(response);
    }

    const actionBodyTemplate = (rowData) => {
        return (
          <div>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-2" onClick={() => this.deleteRow(rowData)} />&nbsp;&nbsp;&nbsp;
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => this.updateRow(rowData)} />
          </div>
        );
    }

    return (
        <div>
            <div>
                <HeaderComponent/>
                <Navmenu/>
                <br/><br/>
                <div className="card">
                    <DataTable stripedRows value={bookings} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="booking_id" header="Booking ID"></Column>
                    <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default UserBookings;