import { Bar} from 'react-chartjs-2';

export function StatusChart({statuses}) {
    const statusToShow = Object.keys(statuses[0]);
    const numbers = Object.values(statuses[0]);
    const colors = Object.values(statuses[1]);

    const data = {
        labels: statusToShow,
        datasets: [
            {
                label: '# of Labels',
                data: numbers,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 3,
            },
        ],
    };
    const options = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Status bar',
            },
        },
    };

    return (
        
            <Bar data={data} options={options} />
        
    )
}