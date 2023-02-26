import React from 'react'
import { Button } from 'react-bootstrap';
import { redirect, useNavigate } from 'react-router-dom';

const ButtonBooking = ({data}) => {

    console.log(data);

    let navigate = useNavigate(); 

    const routeChange = () =>{ 
      let path = `/booking`; 
      navigate(path);
    }

    return (
        <Button as="input" type="button" value="Book now" onClick={routeChange}></Button>
    )
}

export default ButtonBooking;