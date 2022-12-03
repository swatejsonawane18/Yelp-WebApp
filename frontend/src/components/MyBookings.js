

import './mybookings.css';

export default function MyBookings({reservations, setReservation}) {



    function deleteReservation(index){
        let old = JSON.parse(localStorage.getItem('reservations'));
        old.splice(index, 1);
        setReservation(old);
        console.log(reservations.length);
        console.log(old);
        if(old.length==0){
            localStorage.setItem('reservations',JSON.stringify(null));
        }
        else{
        localStorage.setItem('reservations',JSON.stringify(old));
        }
        alert('Reservation cancelled!')
    }

    if(reservations.length==0 && JSON.parse(localStorage.getItem('reservations'))==null){
        return(<>
            <br />
                <div className='text-center'><p className='noresult text-center'>No reservations to show</p></div>
            </>)
    }

    else if(JSON.parse(localStorage.getItem('reservations'))!=null){
        
        console.log(JSON.parse(localStorage.getItem('reservations')));
        if(reservations.length==0)
        {setReservation(JSON.parse(localStorage.getItem('reservations')));}
    return(
        <>
        <div className='text-center'><h3>List of your reservations</h3></div>
        <div className="table table-responsive">
            
            <br></br>

            <table className="mx-auto w-auto booking_table" key="addingtabletotable">
                <thead>
                    <tr className="table">
                    <th>#</th>
                    <th>Business Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Email</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((Item, i) => {
                        console.log(JSON.stringify({Item})+"item");
                        return(<tr className='class_for_hover'>
                            <th>{i+1}</th>
                            <td>{Item[`name`]}</td>
                            <td>{Item[`date`]}</td>
                            <td>{Item[`time`]}</td>
                            <td>{Item['email']}</td>                            
                            <td className="delete_button"><a onClick={() => {deleteReservation({i});}} style={{cursor:'pointer'}}><i class="bi bi-trash"></i></a></td>
                        </tr>)

                    })}
                </tbody>
            </table>

        </div>
        </>
    );
    }
    
    

}