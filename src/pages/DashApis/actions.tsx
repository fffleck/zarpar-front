import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const QuotationsActions = () => {
  const [stocksData, setStocksData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://brapi.dev/api/quote/list?sortBy=change_abs&sortOrder=desc&limit=10&sector=Transportation&token=ifP7dWd3M11DLk493JCnhU');
        setStocksData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de ações:', error);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    if (!stocksData) return;

    const labels = stocksData.stocks.map(stock => stock.name.substring(0,8));
    const data = stocksData.stocks.map(stock => stock.close);

    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('stockChart');

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Fechamento Dia',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 1)',
          borderColor: 'rgba(199, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [stocksData]);

  return (
    <div style={{textAlign: "center"}}>
      <span>Ações</span>
      <canvas id="stockChart" width="250" height="250"></canvas>
    </div>
  );
};

export default QuotationsActions;
