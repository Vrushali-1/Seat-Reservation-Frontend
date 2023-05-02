
import { useEffect, useState,  useRef  } from 'react';
import Navmenu from '../components/Navmenu';
import HeaderComponent  from '../components/Header';
import { getBookingByUser, deleteBooking } from '../services/bookingService';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast'


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        

const UserBookings = (props) => {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    let id = 0;
    const toast = useRef(null);
    
    useEffect(() => {
            getBookings();
    },[]);
    const getBookings = async () => {
        const response = await getBookingByUser(user.student_id);
        setBookings(response);
    }

    const actionBodyTemplate = (rowData) => {
        id = rowData.booking_id;
        return (
          <div>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-2" rounded outlined onClick={confirm1}  />&nbsp;&nbsp;&nbsp;
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" rounded outlined onClick={() => this.updateRow(rowData)} />&nbsp;&nbsp;&nbsp;
            <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-info" rounded outlined onClick={() => this.updateRow(rowData)} />
          </div>
        );
    }

    const confirm1 = () => {
        confirmDialog({
            message: 'Do you want to delete this booking?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
        });
    };

    const viewTemplate = (rowData) => {
        return (
            <div>
              <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary p-mr-2" rounded outlined onClick={() => this.deleteRow(rowData)} />&nbsp;&nbsp;&nbsp;
            </div>
          );
    }

    const accept = async () => {
        console.log('inside cancel booking');
        try {
            const response = await deleteBooking(id);
            if(response.message === 'Booking Deleted'){
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Booking Cancelled!', life: 2000 });
                setTimeout((() =>{
                    getBookings();
                }),1000)
            }else{
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error occured in deletion!', life: 2000 });
            }
          } catch (error) {
            console.log('error',error);
        }
    }

    return (
        <div>
            <ConfirmDialog />
            <Toast ref={toast} />
            <div>
                <HeaderComponent/>
                <Navmenu/>
                <br/><br/>
                <div className="card">
                    <DataTable stripedRows value={bookings} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="booking_id" header="Booking ID"></Column>
                    <Column header="View" body={viewTemplate}></Column>
                    <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default UserBookings;