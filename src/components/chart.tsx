import { Pie } from "react-chartjs-2";
import colorScheme from "../components/color";
import { Categories } from "./interface";

interface ChartProps{
    categories: Categories[];
    data: number[];
}

function Chart({ categories, data }: ChartProps){

    let label:string[] = [];

    function appendLabel(){
        for (let i = 0; i < categories.length; i++){
            label.push(categories[i].category!)
        }
        return label;
    }

    let pieData = {
        labels: appendLabel(),
        datasets: [{
            data: data,
            backgroundColor: colorScheme
        }],
    };
  
    let options = {
        legend: {
          position: "top",
          labels: {
            boxWidth: 10
          }
        },
        animation:{
            duration:0
        },
        maintainAspectRatio: false,
    };

    return (
        <>
            <div className = "chart">
                {data.reduce((a: number, b: number) => a + b, 0) === 0 ? <h1 className="chart-h1">Woo Hoo! You have no items to complete!</h1>:<Pie data = {pieData} width = {"100"} height = {"100"} options = {options}/>}
            </div>
        </>
    );

}

export default Chart;