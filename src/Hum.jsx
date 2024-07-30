import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";


Chart.register(CategoryScale);
function Hum() {
  const [chartData,setChartData] = useState({
    labels: [],
    datasets: []
  })
  function timeConverter(UNIX_timestamp) {
    let time = new Date(UNIX_timestamp);
    let year = time.getFullYear();
    let month = time.getMonth() + 1; // Months are zero-indexed
    let date = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    // Format hours and minutes to 2 digits
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    // Determine AM or PM
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    return `${month}/${date}/${year} - ${hours}:${minutes} ${ampm}`;
}
  const fetchData = async ()=>{
    const url = new URL(window.location.href);
// Get the search parameters
    const params = new URLSearchParams(url.search);
    let res = await axios.get(`http://mnsstrap.ddns.net:5000/getChart/${params.get('client')}/${params.get('days')}`)
    res = res.data
    let _data = []
    res = res.forEach(data=>{
      _data.push({time:data.time,hum:data.hum})
    })
    console.log(_data)
    setChartData({
      labels: _data.map(data=>timeConverter(data.time)),
      datasets: [{
        label: 'Humidity: ',
        data: _data.map(data=>data.hum),
        borderWidth: 1  ,
      borderColor: "rgb(0, 0,0)",
      backgroundColor: "rgba(255, 248, 36)",
      fill: {
        target: "origin", // 3. Set the fill options
        above: "rgba(255, 248, 36, 0.3)"
      }
      }]
    })
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
      <Line
              data={chartData}
              options={{
                responsive:true,
                maintainAspectRatio:false,
                scales: {
                  x: {
                    ticks: {
                      display: false // This will hide the x-axis labels
                    },
                    grid: {
                      display: false // This will hide the x-axis grid lines
                    }
                  },
                  y: {
                    beginAtZero: true,
                    max: 100 // Assuming battery percentage goes from 0 to 100
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Battery"
                  },
                  legend: {
                    display: false
                  }
                }
              }}
            />
    </>
  )
}

export default Hum
