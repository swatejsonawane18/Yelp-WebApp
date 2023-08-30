import * as React from 'react';
import  { useEffect, useState } from 'react'
import { Tab, Box } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@material-ui/lab';
import  Tabs, { tabsClasses } from '@mui/material/Tabs';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Modal_Reserve from './Modal_Reserve';

import axios from 'axios';
import './Card.css'


export default function Card({businessID, businessName, setShowTable2, setShowCard2, showReservation, setShowReservation, setBusinessName, reservations, setReservation}) {
console.log(JSON.stringify(businessID)+" inside card function");

let address="";
let category="";
let latitude=0;
let longitude=0;

const [businesscard, setBusinessCard]=useState([]);
const [reviewscard, setReviewsCard]=useState([]);
const [showModal, setShowModal]= useState(false);
//const [reservation, setReservation] = useState(false);


const containerStyle = {
  width: '100%',
  height: '70vh'
};

const [center,setCenter] = useState({
  lat: 34.05,
  lng: -118.13
});


const onOpenModalLogin = () => {
  setShowModal(true);
};


async function call_search_api(business_id){
  await axios.get('https://webdev-assignment8.wl.r.appspot.com/card_business', { 
                  params: { id: business_id }})
                  .then( function(response) {
                    console.log(response.data);
                    console.log("helllloooooooooo");
                    
                    setBusinessCard(response.data);
                    latitude=(parseFloat(response.data.coordinates.latitude));
                    longitude=(parseFloat(response.data.coordinates.longitude));
                    
                    setCenter({
                      lat: latitude,
                      lng: longitude
                    });
                    // console.log("helllloooooooooo");
                    console.log(JSON.stringify(center) + " in card location!!!!!!!!!!!!!!!!");
                  })
                  .catch(err => {
                    console.error(err);
                  });
}

async function call_review_api(business_id){
  await axios.get('https://webdev-assignment8.wl.r.appspot.com/card_reviews', { 
            params: { id: business_id }})
            .then( function(response) {
              console.log(response.data);
              setReviewsCard(response.data);
            })
            .catch(err => {
              console.error(err);
              console.log("in heeree!!")
            });
}

  
useEffect(()=>{
  if((businessID)!==""){
  call_search_api(businessID);
  call_review_api(businessID);
  }
},[businessID])

const position = {
  lat: 34.05,
  lng: -118.13
}

const onLoad = marker => {
  console.log('marker: ', marker)
}

function onCancelReservation(index){
  console.log(index);
  let old = JSON.parse(localStorage.getItem('reservations'));
        old.splice(index, 1);
        console.log(old+"in cancel reservation!!!");
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


const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  console.log(newValue);
  setValue(newValue);
};

const handleChangeIndex = (index) => {
  setValue(index);
};

function for_scroll_tab(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const theme = useTheme();

if((businessID)!==""){
  
    return (
      <>
      
      <div className='component mx-auto' style={{paddingBottom:'20px'}}>
      <div className='card_div ' id='card_div'>
      <form id='card_form' > 
      <div className='backbutton'><a style={{cursor:'pointer'}}onClick={() => {  setShowCard2(false); setShowTable2(true);}}><i className="bi bi-arrow-left"></i></a></div>
      <div className='card_header' style={{fontWeight:"bold", fontSize:"20px", textAlign:"center", paddingTop:"20px"}}>{businesscard.name}</div>
      <br></br>

      <div className='card_tab' style={{ flex:"1", justifyContent:"center" ,alignItems: "center"}}>
      <TabContext 
        value={value}
      >
        <Box className='box-style-for-tabs'>

        
        <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        indicatorColor='dark'
        className="Tab-custom"
        aria-label="visible arrows tabs example"
        // centered
        TabIndicatorProps={{
          style: {
            backgroundColor: "black"
          }
        }}
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
            <Tab style={{paddingLeft:'20px', paddingRight:'20px'}} label="Business details"  {...for_scroll_tab(0)}/>
            <Tab style={{paddingLeft:'20px', paddingRight:'20px'}} label="Map Location" {...for_scroll_tab(1)} />
            <Tab style={{paddingLeft:'20px', paddingRight:'20px'}} label="Reviews"  {...for_scroll_tab(2)}/>
          {/* </TabList> */}
          </Tabs>
        </Box>
 

        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        >
          
        <TabPanel value={0} dir={theme.direction} style={{overflow:'hidden'}}>
        
        <div className='row' style={{paddingTop:'20px'}}>

        {(() => {
          setBusinessName(businesscard.name);
            // console.log("in location")

            if(businesscard.hasOwnProperty('location')){
              
              if( businesscard.location.display_address.length!==""|| !businesscard.location.display_address!==null){
                console.log("in display location")
                return(
                  <div className="form-group col-sm-6 mx-auto"><label htmlFor="address">Address</label>
                  
                  {businesscard.location.display_address.forEach((value, j) =>{
                    console.log(value)
                    address+=value+" "
                    // <p>{value}</p>
                  })}
                  <div className='row'>
                  <span className='form-group mx-auto'>{address}</span>
                  </div>
                  </div>
                )
              }
            }

        })()}

      {(() => {

        if(businesscard.hasOwnProperty('categories')){
          
          if( businesscard.categories.length!==0 || businesscard.categories!==null){
            return(
            <div className="form-group col-sm-6 mx-auto"><label htmlFor="category">Category</label>
            {businesscard.categories.forEach((value, j) =>{
              if(j!==0){
                category+=" | ";
              }
              // console.log(value.title)
              category+=value.title
            })}
            <div className='row'>
            <span className='form-group col-sm-6 mx-auto'>{category}</span>
            </div>
            </div>
            )
          }
        }

      })()}
      </div>

     

      <div className='row'>

      {(() => {
            console.log("in phone")
            if(businesscard.hasOwnProperty('display_phone')){
              if( businesscard.display_phone!=="" || businesscard.display_phone!==null){
                return(
                <div className="form-group col-sm-6 mx-auto"><label htmlFor="status">Phone Number</label>
                <div className='row'>
                <span className='form-group col-sm-6 mx-auto'>{businesscard.display_phone}</span></div>
                </div>
                )
              }
          }

        })()}

      {(() => {
        if(businesscard.hasOwnProperty('price')){
          if(businesscard.price!=="" || businesscard.price!==null){
            return(
            <div className="form-group col-sm-6 mx-auto"><label htmlFor="status">Price range</label>
            <div className='row'>
            <span className='form-group col-sm-6 mx-auto'>{businesscard.price}</span></div>
            </div>
            )
          }
        }
      })()}

      </div>

      <div className='row'>

      {(()=>{

        if(businesscard.hasOwnProperty('hours')){
          // console.log("inside if of first_pairs");
          if( businesscard.hours.length!==0 || businesscard.hours!==null){
            // console.log("inside length of first_pairs");
              if(businesscard.hours[0].is_open_now===false){
                // console.log("inside hours of first_pairs");
                return(
                  <div className='form-group col-sm-6 mx-auto'>
                  <label htmlFor="status">Status</label>
                  <div className='row'>
                  <span className='status_closed form-group col-sm-6 mx-auto'>Closed</span>
                  </div>
                  </div>
                )
              }
              else{
                return(
                  <div className='form-group col-sm-6 mx-auto'>
                  <label htmlFor="status">Status</label>
                  <div className='row'>
                  <span className='status_open form-group col-sm-6 mx-auto'>Open Now</span>
                  </div>
                  </div>
                )
              }
          }
        }
      })()}

      {(()=>{
        if(businesscard.hasOwnProperty('url')){
          if(businesscard.url!=="" || businesscard.url!==null){
            return(
            <div className="form-group col-sm-6 mx-auto"><label htmlFor="more_info">Visit yelp for more</label>
            <div className='row'>
            <span className='form-group col-sm-6 mx-auto'><a style={{textDecoration:'underline'}} href={businesscard.url} target="_blank">Business Link</a></span></div>
            </div>
            )
          }
      }
      })()}

    </div>
      

      {(()=>{
        let reservation_json=JSON.parse(localStorage.getItem('reservations'));
        let i=0;
        if(reservation_json==null){
          console.log("in reservation butoon!!!!!!!!!!!!!");
          return(
            <div className="text-center">
              <button type="button" className="btn btn-danger" data-bs-toggle="modal" onClick={onOpenModalLogin}>Reserve Now</button>
              {console.log(showReservation+" showing reservation")}
              {showModal && <Modal_Reserve i={i} showModal={showModal} setShowModal={setShowModal}  reservations={reservations} setReservation={setReservation} businessName={businessName} />}
              
            </div>)
        }
        else{
          // console.log("in reservation butoon!!!!!!!!!!!!!");
          let reserved=false;
          for(i=0;i<reservation_json.length;i++){
            if(reservation_json[i].name==businesscard.name){
              if(reservation_json[i].hasOwnProperty('reserved')){
                if(reservation_json[i].reserved==1){
                  reserved=true;
                }
                else{
                  reserved=false;
                }
                break;
              }
            }
          }

          if(reserved==false){
            
            return(
              <div className="text-center">
                <button type="button" className="btn btn-danger" onClick={onOpenModalLogin}>Reserve Now</button>
                <div>{showModal && <Modal_Reserve i={i} showModal={showModal} setShowModal={setShowModal}  reservations={reservations} setReservation={setReservation} businessName={businessName} />}
              </div>
              </div>
            )
          }
          else{
            return(
              <div className='text-center'>
                <button type="button" className="btn btn-primary" onClick={()=>{onCancelReservation(i)}}>Cancel Reservation</button>
              </div>
            )
          }
      }

      

        
    })()}


    <br></br>
    <div className="d-flex justify-content-center" >
      <p style={{marginTop: "revert"}}>Share on:</p>
      <a href={"https://twitter.com/intent/tweet?text=Check "+businesscard.name+" on Yelp. \n"+businesscard.url} target="_blank"><i className="fa-2x fab fa-twitter"></i></a>
      <a href={"https://www.facebook.com/sharer/sharer.php?u="+businesscard.url} target="_blank"><i className="fa-2x fab fa-facebook-f"></i></a>
    </div>

    <div className='container'>

    {(()=>{
      
        if(businesscard.hasOwnProperty('photos')){
          console.log("inside images")

            return(
              <div id="carouselExampleControls" className="carousel slide carousel-dark" data-bs-ride="carousel">
              <div className="carousel-inner">

              {businesscard.photos.map((value, j) =>{
                  console.log(value+"in caraousel!!!AAAAAAAAAAAA")
                  if(j==0){
                      return(
                        <div className="carousel-item active">
                          <img className="d-block mx-auto cara-image" src={value} alt="First slide" />
                        </div>
                      )
                  }
                    else{
                      return(
                      <div className="carousel-item">
                        <img className="d-block mx-auto cara-image" src={value} alt="Slide" />
                      </div>
                      )
                    }
                })}
               
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            )
      }
      })()}


    </div>
        
        </TabPanel>
        
        <TabPanel value={1} dir={theme.direction} >
        
         
          {/* <LoadScript
          googleMapsApiKey="AIzaSyAHi5s41PtuR0kGKK-MkD6N5eW9Wvn7Wa0"
          > */}
          <div  style={{paddingTop:'20px'}}>
        <GoogleMap
        
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          <Marker
            onLoad={onLoad}
            position={center}
          />
          
          <></>
        </GoogleMap>
        </div>
      {/* </LoadScript> */}
        
        </TabPanel>

        <TabPanel value={2} dir={theme.direction}>
          

        {(()=>{
            // call_review_api();
            
            if(reviewscard.length!==0){
              return(
              <div className='review_card' key="divofreviewcard">
              <table className="table table-striped" key="tableofreview">
                <tbody key="tbodyofreview">
              {reviewscard.reviews.map((value, j) =>{
                // console.log(JSON.stringify(value)+" value of review");
                let time=value.time_created.substring(0, value.time_created.indexOf(' '))
                return(
                <tr className="trofreview" key={value.url.toString()}>
                  <div style={{fontWeight:'bold', padding:'0px !important'}}>{value.user.name}</div>
                  <br></br>
                  Rating:{value.rating}/5
                  <br></br>
                  <br></br>
                  {value.text}
                  <br></br>
                  <br></br>
                  {time}
                  <br></br>
                  <br></br>
                </tr>
                )
                
              })}
              </tbody>
              </table>
              </div>
              )
            }
        })()}

          
        </TabPanel>
        </SwipeableViews>
        
      </TabContext>
      </div>

      </form>
      </div>
      </div>

      </>
    )

}
else{
  return(<></>)
}
}
// }


