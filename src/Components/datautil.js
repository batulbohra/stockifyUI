
export default function datautil(data){


      let dataPoints = [];
      for (let date in data) {
        let dataPoint = {
          x: new Date(date),
          y: [
            Number(data[date]['1. open']),
            Number(data[date]['2. high']),
            Number(data[date]['3. low']),
            Number(data[date]['4. close'])
          ]
        };
        dataPoints.push(dataPoint);
      }
      return dataPoints;



    }      