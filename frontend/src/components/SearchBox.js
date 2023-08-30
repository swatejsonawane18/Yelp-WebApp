import React, { useState } from 'react'

import axios from 'axios';
import './SearchBox.css'
import './custom.css';
import Table from './Table.js';
import Card from './Card.js'



export default function SearchBox({reservations, setReservation}) {

  const [showTable, setShowTable] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showNoBusiness, setShowNoBusiness] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [businessID, setBusinessID] = useState();
  const [businessName, setBusinessName]= useState('');
  const [keywordText, setkeywordText]=useState('');
  const [terms, setTerms]=useState([]);
  const [autodrop, setAutoDrop]= useState(false);
  const [autodroptemp, setAutoDropTemp]= useState(false);
  const [categories, setCategories]= useState([]);
  const [business, setBusinesses]= useState([]);

  function disable_location(event){
    let x = event.target.form.inputLocation;
    let status = event.target.form.gridCheck;
    x.disabled = status.checked ? true : false;
      if (!x.disabled) {
          x.focus();
          x.style.backgroundColor = "white";
      }
      else{
        x.value="";
        x.style.backgroundColor = "rgb(219, 219, 219)";
      }
  }

  function clear_form(event){
    
    event.preventDefault();
    
      event.target.form.reset();
      setkeywordText('');
      setShowTable(false);
      setShowCard(false);
      setShowNoBusiness(false);
      
      let x= event.target.form.gridCheck;
      x.disabled=false;
      event.target.form.inputLocation.style.backgroundColor = "white";
         
  }

  const table_headers = [
    { heading: '#' , value:"1"},
    { heading: 'Images', value:'image_url'},
    { heading: 'Business Name', value:'name'},
    { heading: 'Rating', value:'rating'},
    { heading: 'Distance (miles)', value: 'distance'},
  ];

  async function postSubmit(event) {
    event.preventDefault();
    console.log("hi");

                const form = event.target.form;
                const keyword = form.inputKeyword.value;
                let distance = form.inputDistance.value
                const category = form.inputCategory.value;
                const location = form.inputLocation.value;


              
              if(parseInt(distance)>24){
                distance="24";
              }
                console.log(keyword);

                let x = form.gridCheck;
                
                if(keyword==="" | distance==="" | category==="" | (location==="" & x.checked===false)){
                  form.reportValidity();
                  return;
                }

                console.log(form);

              if(x.checked){

                var latitude="",longitude="";

                  await axios.get('https://webdev-assignment8.wl.r.appspot.com/iplocation')
                  .then( function(response) {
                    
                    let coordinates = response.data.loc.split(",");
                    // console.log((coordinates[0])+ 'location');
                    latitude=coordinates[0];
                    longitude=coordinates[1];
                    console.log(latitude);
                  })
                  .catch(err => {
                    console.error(err);
                  });

                    const fetchData = async()=>{
                      try{
                        await axios.get('https://webdev-assignment8.wl.r.appspot.com/business_search', { 
                          params: { keyword: keyword,
                          distance:distance,
                          category:category,
                          latitude:latitude,
                          longitude:longitude }})
                          .then(function (response){
                            
                            if(response.data.businesses.length===0){
                              
                              setShowTable(false);
                              setShowNoBusiness(true);
                            }
                            else{
                              setShowNoBusiness(false);
                              setBusinesses(response.data.businesses);
                              setShowTable(true);
                            }
                            console.log(business);
                          });

                         
                      }
                      catch(e){
                        console.log(e);
                        
                      }
                    };
                    fetchData();
              }


              else{

                // var latitude="",longitude="";
                  let flag=1;
                  await axios.get('https://webdev-assignment8.wl.r.appspot.com/googlelocation', {
                    params: {user_location: location}
                  })
                  .then( function(response) {
                    if(response.data.results.length==0){
                      setShowNoBusiness(true);
                      flag=0;
                    }  
                    else{
                      setShowNoBusiness(false);
                    console.log(JSON.stringify(response.data) );                
                    latitude = response.data.results[0].geometry.location.lat;
                    longitude = response.data.results[0].geometry.location.lng;
                    console.log(latitude);
                    }
                  })
                  .catch(err => {
                    console.error(err);
                  });

                  const fetchData = async()=>{
                    try{
                      await axios.get('https://webdev-assignment8.wl.r.appspot.com/business_search', { 
                        params: { keyword: keyword,
                        distance:distance,
                        category:category,
                        latitude:latitude,
                        longitude:longitude }})
                        .then(function (response){
                          
                          if(response.data.businesses.length===0){
                            
                            setShowTable(false);
                            setShowNoBusiness(true);
                          }
                          else{
                            setShowNoBusiness(false);
                            setBusinesses(response.data.businesses);
                            setShowTable(true);
                          }
                          console.log(business);
                        });

                       
                    }
                    catch(e){
                      console.log(e);
                      
                    }
                  };
                  if(flag==1)
                    fetchData();

                  
              }
  }



async function callauto(event){
  setkeywordText(event.target.value);
  if(event.target.value==""){
    setAutoDrop(false);
  }
  else{
  setAutoDrop(true);
  console.log(event.target.value+"in callauto");
    
    if(event.target.value!=="")
    autocomplete(event.target.value);
  }
}

async function autocomplete(key) {
 
  console.log(key);

    
    const fetchData = async()=>{
      try{
      const rawData = await axios.get('https://webdev-assignment8.wl.r.appspot.com/autocomplete', {params: {keyword:key}})
       console.log(rawData.data.terms);

       if(rawData.data.terms.length == 0 && rawData.data.categories.length == 0 ){
        setAutoDrop(false);
        setAutoDropTemp(false);
      }
      else{
        setAutoDropTemp(true);
      }

            
      setTerms(rawData.data.terms);
      setCategories(rawData.data.categories);

      console.log(rawData.data.terms.length + "in autocomplete!!!!!!");
      console.log(rawData.data.categories.length + "in autocomplete!!!!!!");

      }
      catch(e){
        console.log(e);
        
      }
    };
    if(key!=="")
    {fetchData();}
  console.log(keywordText);
  console.log(terms);
  console.log(categories);
  
}

const onTermsHandler = (text) => {
  console.log(text+"in handler");
  setkeywordText(text);
  setTerms([]);
  setCategories([]);
}

 

    return (
      <>
      <div className='container mx-auto'>
      <div className="card bg-white mx-auto p-5" >
        <form  id='input_form'>
          <div className='text-center '><h2>Business Search</h2></div>
          <div className="form-group">
            <label htmlFor="inputKeyword" className=" banner_label">Keyword </label>
            <input type="text" className="form-control " id="inputKeyword" name="inputKeyword"  value={keywordText} 
            onChange={(e) => { callauto(e);}} 
            onBlur={()=>{
              setTimeout(()=>{
                setAutoDrop(false);
                setTerms([]);
                setCategories([]);
              },300);
            }} required/>
            
          {autodrop && autodroptemp && <div className='outer-auto-options' >
            { autodrop && <div className="form-control auto-options" > { categories.map((category, i) =>
              <div className='option_hover' key={i} onClick={() => {onTermsHandler(category.title); }}>{category.title}</div>
            )} 
            
            {terms && terms.map((term, i) =>
              <div className='option_hover' key={i} onClick={() => {onTermsHandler(term.text);}}>{term.text}</div>
            )}
            
            </div>}

          </div>}

          </div>
          
          <div className="row">
          <div className="form-group col-sm-6">
            <label htmlFor="inputDistance" className=" ">Distance </label>
            <input type="text" className="form-control" id="inputDistance" defaultValue="10"/>
          </div>
          <div className="form-group col-sm-5 ">
            <label htmlFor="inputCategory" className="banner_label">Category </label>
            <select className="form-select w-75"  id="inputCategory" required>
                                <option value="all">Default</option>
                                <option value="arts">Arts & Entertainment</option>
                                <option value="health">Health & Medical</option>
                                <option value="hotelstravel">Hotels & Travel</option>
                                <option value="food">Food</option>
                                <option value="professional">Professional Services</option>
                            </select>          
          </div>
          </div>
          <div className="form-group ">
            <label htmlFor="inputLocation" className=" banner_label">Location </label>
            <input type="text" className="form-control" id="inputLocation"  required/>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" onClick={disable_location}/>
              <label className="form-check-label" htmlFor="gridCheck">
                Auto-detect my location
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary m-2 btn-danger" form="input_form" onClick={postSubmit}>Submit</button>
            <button type="button" className="btn btn-primary m-2" id='search-submit' onClick={clear_form}>Clear</button>
          </div>
        </form>  
        </div> 
        </div> 
        
      
        {showTable && <Table data = {business} setShowTable1={setShowTable} setShowCard1={setShowCard} setBusinessID={setBusinessID} table_headers= {table_headers} />}
        {showNoBusiness && <div className=' mx-auto text-center d-flex justify-content-center'><p className='noresult d-flex justify-content-center'>No results available</p></div>}
        {showCard &&  <Card businessID={businessID} businessName={businessName}setShowTable2={setShowTable} setShowCard2={setShowCard} setBusinessName={setBusinessName} showReservation={showReservation } setShowReservation={setShowReservation} reservations={reservations} setReservation={setReservation} />
          }
          
        </>
    )
}


