import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


import  { useState } from 'react'



export default function Modal_Reserve({ setReservation, reservations ,showModal, setShowModal, businessName, children }) {

  const [submitClicked, setSubmitClicked]= useState(false);

  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})


  let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;



function removeModal(){
  setShowModal(false);
}

function confirmBooking () {


  const { email, date, hours, minutes } = form


      let time=hours+":"+minutes;

      console.log(email+" "+date+" "+hours+" "+minutes);

      let booking_data={email:email, date:date, time:time, name:businessName, reserved:1};
      console.log(booking_data);

      let old = JSON.parse(localStorage.getItem('reservations'));
      console.log(old);
      if(old === null) {
          old = [];
          old.push(booking_data)
      }
      else{
        old.push(booking_data)
      }
      localStorage.setItem('reservations',JSON.stringify(old));
      setReservation(old);
      console.log(old);
      setShowModal(false);
}

const setField = (field, value) => {
  console.log(value+" in set field")
  setForm({
    ...form,
    [field]: value
  })
  const newErrors = findFormErrors()
  setErrors(newErrors);

  if ( !!errors[field] && submitClicked===true){
    console.log("in errors of setfield"+errors[field]);
      
      if ( Object.keys(newErrors).length > 0 ) {
        
        setErrors(newErrors)
      }
}
else if(submitClicked==false){
  console.log("in else");
  setErrors({
    ...errors,
    [field]: null
  })
}
}

const findFormErrors = () => {
  
  const formm = document.getElementById('formm');
  const FormEmail = formm.elements['formemail'].value;
  const FormDate = formm.elements['formdate'].value;
  const FormMins = formm.elements['formmins'].value;
  const FormHrs = formm.elements['formhrs'].value;

  const errors = {}
  
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  console.log(regex.test(FormEmail)+" in regex");
  if ( FormEmail ==='' ) errors.email = 'Email is required'
  else if ( !regex.test(FormEmail) ) errors.email = 'Email must be a valid email address'
  
  if ( FormDate === '' ) errors.date = 'Date is required'
  
  if ( FormHrs ==='') errors.hours = 'Enter Hours!'

  if ( FormMins ==='') errors.minutes = 'Enter Minutes!'
  
  console.log(errors);
  return errors
}

const handleSubmit = e => {
  e.preventDefault()
 
  setSubmitClicked(true);
  const newErrors = findFormErrors()
  
  if ( Object.keys(newErrors).length > 0 ) {
    
    setErrors(newErrors)
  } else {
    
    confirmBooking();
    alert('Reservation created!')
  }
}




  return (
    <div>
    

<Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>
           Reservation Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Modal.Title className='text-center'>
          {businessName}
          </Modal.Title>
            <Form id='formm'>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                  type='text' 
                  onChange={ e => setField('email', e.target.value)}
                  isInvalid={ !!errors.email }
                  id='formemail'
              />
              <Form.Control.Feedback type='invalid'>
                  { errors.email }
              </Form.Control.Feedback>
          </Form.Group>

            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control id='formdate' type="date" min={today} onChange={ e => setField('date', e.target.value) } isInvalid={ !!errors.date }>
              
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                  { errors.date }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Row>
                <Col xs={4}>
              <Form.Control  as='select' onChange={ e => setField('hours', e.target.value) } id='formhrs' isInvalid={errors.hours} required>
                <option value='' selected hidden></option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
                <option value='13'>13</option>
                <option value='14'>14</option>
                <option value='15'>15</option>
                <option value='16'>16</option>
                <option value='17'>17</option>
              </Form.Control>
              </Col>
              :
              <Col xs={4}>
              <Form.Control onChange={ e => setField('minutes', e.target.value) }  as='select' id='formmins' isInvalid={errors.minutes} required>
                <option value='' selected hidden ></option>
                <option value='00'>00</option>
                <option value='15'>15</option>
                <option value='30'>30</option>
                <option value='45'>45</option>
                
              </Form.Control>
              
              
              </Col>
              <Col style={{paddingTop:'8px',paddingLeft:'0px', paddingRight:'0px'}}>
              <i class="bi bi-clock"></i>
              </Col>
              </Row>
              
            </Form.Group>

            <Form.Group className='mx-auto' style={{paddingTop:'10px'}}>
            
            <div className='mx-auto' style={{marginLeft:'auto', marginRight:'auto', textAlign:'center'}}><Button  type='submit' className='btn btn-danger ' onClick={handleSubmit}>Submit</Button></div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="dark" onClick={removeModal}>
           Close
          </Button>
        </Modal.Footer>
      </Modal>

</div>
  )
}


