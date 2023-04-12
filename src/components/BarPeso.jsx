import React, { useState, useEffect, useContext, useRef } from 'react';
import Chart from 'chart.js/auto';
import OrneContext from '../Context/MyContext';

  function BarPeso() {
    const {controles} = useContext(OrneContext)
    const chartContainer = useRef(null);
    const chart = useRef(null);
    const [lastMonthWeight, setLastMonthWeight] = useState({ current: null });
  
    useEffect(() => {
      if (chart.current) {
        chart.current.destroy();
      }
    
      chart.current = new Chart(chartContainer.current, {
        type: 'bar',
        data: {
          labels: controles.map((control) => control.fecha),
          datasets: [
            {
              label: 'Peso Actual',
              data: controles.map((control) => control.pesoActual),
              backgroundColor: '#6497B1',
              borderColor: '#0D1C33',
              borderWidth: 1,
              barThickness: 28,
              hoverOffset: 4,
              hoverBackgroundColor: '#74A9CF',
              hoverBorderColor: '#1F3A62',
              hoverBorderWidth: 1,
              // Función para mostrar la diferencia de peso en el tooltip
              // con respecto al mes anterior
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const index = context.dataIndex;
                    const currentWeight = context.parsed.y;
                    let label = ' ' + currentWeight;
                    if (lastMonthWeight.current !== null) {
                      const lastWeight = lastMonthWeight.current[index];
                      const diff = currentWeight - lastWeight;
                      const diffString = diff.toFixed(2);
                      if (diff === 0) {
                        label += ' (0)';
                      } else {
                        label += ` (${diff > 0 ? '+' : '-'}${Math.abs(diffString)})`;
                      }
                    }
                    label += ' kg'; // Agrega "kg" después del peso
                    return label;
                  },
                },
              },
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  
      // Actualizar la referencia al valor anterior de controles
      lastMonthWeight.current = controles.map((control, index) => {
        if (index === 0) {
          return null;
        } else {
          return controles[index - 1].pesoActual;
        }
      });
    }, [controles]);
  
    return <canvas ref={chartContainer} />
  

  };
  
  export default BarPeso;