import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";

const Quotations: React.FC = () => {
  const [exchangeRateData, setExchangeRateData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://open.er-api.com/v6/latest/USD`);
        if (response.data && response.data.rates) {
          setExchangeRateData(response.data.rates);
        } else {
          console.error('Exchange rate data not available:', response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rate data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

    const currencies = ['EUR', 'JPY', 'CAD', 'AUD', 'BRL'];
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda se for menor que 10
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda se for menor que 10
    const formattedDate = `${day}/${month}/${today.getFullYear()}`;

  return (
  
        <div className="card border-light col-xl-5 col-lg-12 col-md-12" style={{"padding": 0}}>
       
        <div className="card-img-top" style={{"backgroundColor": "#9f9f9f", "padding": 10}} >
            <h5 style={{"color": "white", "textAlign": "center"}}> Quotations Dolar Today: {formattedDate} </h5></div>
            <div className="table">
                    <Table striped bordered>
                    <thead>
                    <tr>
                        <th scope="col">Currency</th>
                        <th scope="col">Rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currencies.map(currency => (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>{exchangeRateData[currency].toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
  
  );
          };

export default Quotations;
