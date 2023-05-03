
import { useEffect, useState,  useRef  } from 'react';
import Navmenu from '../components/Navmenu';
import HeaderComponent  from '../components/Header';
import { getBookingByUser, deleteBooking } from '../services/bookingService';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast'
import Table from 'react-bootstrap/Table';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const UserBookings = (props) => {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    let id = 0;
    const [data,setData] = useState(null);
    const toast = useRef(null);
    const op = useRef(null);
    
    useEffect(() => {
            getBookings();
    },[]);
    const cols = [
        { field: 'booking_id', header: 'Booking ID' },
        {field:'createdAt', header:'Booking Date'},
        { field: 'departure', header: 'From' },
        { field: 'destination', header: 'To' },
        { field: 'travel_date', header: 'Date' }
    ];
    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));
    const getBookings = async () => {
        const response = await getBookingByUser(user.student_id);
        const mapped = response.map((booking) => ({
            ...booking,
            createdAt:new Date(booking.createdAt).toISOString().split('T')[0],
            travel_date:new Date(booking.travel_date).toISOString().split('T')[0]
         })
        )
        setBookings(mapped);
    }

    const actionBodyTemplate = (rowData) => {
        id = rowData.booking_id;
        return (
          <div>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-2" rounded outlined onClick={confirm1}  />&nbsp;&nbsp;&nbsp;
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" rounded outlined onClick={() => this.updateRow(rowData)} />&nbsp;&nbsp;&nbsp;
            <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-info" rounded outlined onClick={() => { showPdf(rowData); generatePdf()}} />
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
              <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary p-mr-2" rounded outlined onClick={(e) => {showPdf(rowData);op.current.toggle(e)}} />&nbsp;&nbsp;&nbsp;
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

    const showPdf = (rowData) => {
        setData(rowData);
    }

    const generatePdf = () => {
        const tableString = ` 
        <div style="display: flex; justify-content: center;">
        <div style="width: 700px;">
        <Table striped bordered hover className="table" id="pdfTables">
            <tbody>
                <tr>
                    <td colSpan="2"><h3>Bus Seat Reservation</h3></td>
                </tr>
                <tr>
                    <td colSpan="2">Booking Details</td>
                </tr>
                <tr>
                    <td>Booking No:</td>
                    <td>${data ? data.booking_id : ''}</td>
                </tr> 
                <tr>
                    <td>Booking Date:</td>
                    <td>${data ? data.createdAt : ''}</td>
                </tr>
                <tr>
                    <td colSpan="2">Personal Details</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>${user.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${user.email}</td>
                </tr>
                <tr>
                    <td colSpan="2">Bus Details</td>
                </tr>
                <tr>
                    <td>From</td>
                    <td>${data ? data.departure : ''}</td>
                </tr>
                <tr>
                    <td>To</td>
                    <td>${data ? data.destination : ''}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>${data ? data.travel_date : ''}</td>
                </tr>
                <tr>
                    <td>Seats</td>
                    <td>${data ? data.seats.map((seat) => seat.seat_name).join(', ') : ''}</td>
                </tr>
            </tbody>
        </Table>
        <div>
    </div>`;
    
            // convert the HTML string to pdfmake format
        const pdfContent = htmlToPdfmake(tableString);

        // create a new PDF document
        const docDefinition = { content: pdfContent };
        const doc = pdfMake.createPdf(docDefinition);

        // open the PDF document in a new window
        doc.download('bus_reservation.pdf');
    }

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, bookings);
                doc.save('bookings.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(bookings);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'bookings');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded outlined onClick={exportExcel} data-pr-tooltip="XLS" />&nbsp;&nbsp;&nbsp;
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded outlined onClick={exportPdf} data-pr-tooltip="PDF" />
        </div>
    );


    return (
        <div>
            <ConfirmDialog />
            <Toast ref={toast} />
            <div>
                <HeaderComponent/>
                <Navmenu/>
                <br/><br/>
                <div className="card">
                    <DataTable stripedRows value={bookings} header={header} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="booking_id" header="Booking ID"></Column>
                    <Column field="createdAt" header="Booking Date"></Column>
                    <Column field="departure" header="From"></Column>
                    <Column field="destination" header="To"></Column>
                    <Column field="travel_date" header="Travel Date"></Column>
                    <Column header="View" body={viewTemplate}></Column>
                    <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
            <OverlayPanel ref={op} showCloseIcon >
           <div>
<Table striped bordered hover className="table" id="pdfTables" style={{width:"500px"}}><tbody> <tr><td colSpan="2"><h3>Bus Seat Reservation</h3></td></tr> <tr><td colSpan="2">Booking Details</td></tr> <tr> <td>Booking No:</td><td>{data ? data.booking_id:``}</td> </tr> 
<tr> <td>Booking Date:</td><td>{data ? data.createdAt : ''}</td> </tr>
 <tr><td colSpan="2">Personal Details</td></tr> <tr><td>Name</td><td>{user.name}</td></tr>
  <tr> <td>Email</td><td>{user.email}</td> </tr> <tr><td colSpan="2">Bus Details</td></tr> 
  <tr> <td>From</td><td>{data ? data.departure : ''}</td> </tr> <tr> <td>To</td><td>{data? data.destination : ''}</td> </tr> 
  <tr> <td>Date</td><td>{data ? data.travel_date : ''}</td> </tr> <tr> <td>Seats</td><td>{data ? data.seats.map((seat) => `${seat.seat_name}`).join(", ") : ''}</td> </tr>
  </tbody></Table></div>
       </OverlayPanel>
        </div>

    )
}

export default UserBookings;