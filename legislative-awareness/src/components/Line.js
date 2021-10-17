import React from 'react';
import { Line } from 'react-chartjs-2';

const state = {
    labels: ["Months", "Go", "Here"],
    
    datasets: [
        {
            label: "Actions (Bills)", // The key for the data
            backgroundColor: 'rgb(181, 144, 225)',
            borderColor: 'rgb(0,0,0)',
            borderWidth: 2,
            data: [1,2,3]
        }
    ]
}

class Line extends React.Component {
    render() {
        return (
            <div>
                <Line
                data={state}
                options={{
                    title:{
                    display:true,
                    text:'Average Rainfall per month',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                />
            </div>
        )
    }
}

export default Line;