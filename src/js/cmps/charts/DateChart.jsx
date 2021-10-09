import { Bar } from 'react-chartjs-2';

export function DateChart({ dateCounter}) {
    const rand = () => Math.round(Math.random() * 20 - 10);
    console.log(Object.keys(dateCounter));
    console.log(Object.values(dateCounter));
    const data = {
        labels: Object.keys(dateCounter),
        datasets: [
            {
                type: 'line',
                label: 'Dataset 1',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2,
                fill: false,
                data: [rand(), rand(), rand(), rand(), rand(), rand()],
            },
            {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: 'rgb(255, 99, 132)',
                data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
                borderColor: 'white',
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: 'rgb(75, 192, 192)',
                data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
            },
        ],
    };
    return (
        <Bar data={data} />
    )
}