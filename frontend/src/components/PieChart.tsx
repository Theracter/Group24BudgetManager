import { Chart } from "react-google-charts";

function PieChart() {
    const data = [
      ["Task", "Hours per Day"],
      ["Unnspent", 9],
      ["Eat", 2],
      ["Commute", 2],
      ["Watch TV", 2],
      ["Sleep", 7],
      ["gas", 10],
    ];
  
    const options = {
        slices: [

            { color: '#686a6e' }, // First slice will be grey
      
            null, // Second slice will use default color
      
      
          ],
          
    };
    return (
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={900}
        height={500}
      />
    );
  }

export default PieChart;