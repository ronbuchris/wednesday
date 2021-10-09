import { Bar } from 'react-chartjs-2';

export function PersonChart({ personsCount }) {
    const persons = Object.keys(personsCount)
    const numbers = Object.values(personsCount)
    const colors = ["#0086c0", "#0086c0", "#0086c0", "#0086c0",
        "#0086c0", "#0086c0", "#0086c0", "#0086c0", "#0086c0",
        "#0086c0", "#0086c0", "#0086c0", "#0086c0", "#0086c0",
        "#0086c0", "#0086c0", "#0086c0", "#0086c0", "#0086c0",
        "#0086c0", "#0086c0", "#0086c0"
    ]
    const data = {
        labels: persons,
        datasets: [
            {
                label: '',
                data: numbers,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2,
            },
        ],
    };
    const options = {
        type:'horizontal',
        maintainAspectRatio: false,
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Person bar',
            },
        },
    };

    return (
            <Bar data={data} options={options}/>
    )
}