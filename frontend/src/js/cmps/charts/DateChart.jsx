import { Bar } from 'react-chartjs-2';

export function DateChart({ dateCounter}) {
    const values = Object.values(dateCounter)
    const data = {
        labels: Object.keys(dateCounter),
        datasets: [
            {
                type: 'bar',
                label: 'Undone Items',
                backgroundColor: 'rgb(255, 99, 132)',
                data: [values[0].elseStatus, values[1].elseStatus, values[2].elseStatus, values[3].elseStatus, values[4].elseStatus, values[5].elseStatus, values[6].elseStatus, values[7].elseStatus, values[8].elseStatus, values[9].elseStatus, values[10].elseStatus, values[11].elseStatus],
                borderColor: 'white',
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Done Items',
                backgroundColor: 'rgb(75, 192, 192)',
                data: [values[0].doneStatus, values[1].doneStatus, values[2].doneStatus, values[3].doneStatus, values[4].doneStatus, values[5].doneStatus, values[6].doneStatus, values[7].doneStatus, values[8].doneStatus, values[9].doneStatus, values[10].doneStatus, values[11].doneStatus],
            },
        ],
    };

    return (
        <Bar data={data} />
    )
}