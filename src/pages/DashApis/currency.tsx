import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const QuotationsCurrency = () => {
    const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get('http://brapi.dev/api/v2/currency?currency=USD-BRL,EUR-BRL,ARS-BRL,JPY-BRL,GBP-USD,GBP-BRL,CAD-BRL&token=ifP7dWd3M11DLk493JCnhU');
        setCurrencyData(response.data.currency);
      } catch (error) {
        console.error('Erro ao buscar dados de moeda:', error);
      }
    };

    fetchCurrencyData();
  }, []);

  return (
    <div>
      <iframe src='https://br.investing.com/portfolio/?portfolioID=ZWVhMWc0NmkxY2BoZT9hYg%3D%3D' height={400} width={400}></iframe>
    </div>
  );
};

export default QuotationsCurrency;
