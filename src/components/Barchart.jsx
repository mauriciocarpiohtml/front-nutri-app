
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BarChart({ data, label, dataKey }) {
  const chartContainer = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (chart.current) {
      chart.current.destroy();
    }

    chart.current = new Chart(chartContainer.current, {
      type: 'bar',
      data: {
        labels: data.map((item) => item.fecha),
        datasets: [
          {
            label,
            data: data.map((item) => item[dataKey]),
            backgroundColor:'#6497B1',
            borderColor: '#0D1C33',
            borderWidth: 1,
            barThickness: 28,
            hoverOffset: 4,
            hoverBackgroundColor: '#74A9CF',
            hoverBorderColor: '#1F3A62',
            hoverBorderWidth: 1,
            tooltip: {
              callbacks: {
                label: function (context) {
                  const currentValue = context.parsed.y;
                  let label = ' ' + currentValue + ' cm';
                  if (context.dataIndex > 0) {
                    const lastValue = data[context.dataIndex - 1][dataKey];
                    const diff = currentValue - lastValue;
                    const diffString = diff.toFixed(2);
                    if (diff === 0) {
                      label += ' (0)';
                    } else {
                      label += ` (${diff > 0 ? '+' : '-'}${Math.abs(diffString)})`;
                    }
                  }
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
  }, [data, dataKey]);

  return <canvas ref={chartContainer} />;
}

export default BarChart;