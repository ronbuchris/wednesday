import { Bar } from 'react-chartjs-2';

export function PersonChart({ personsCount }) {
    const persons = Object.keys(personsCount)
    const numbers = Object.values(personsCount)
    const colors = ["#9cd326",
        "#037f4c", "#0086c0", "#579bfc", "#66ccff", "#a25ddc",
        "#784bd1", "#808080", "#333333", "#ff7575", "#faa1f1",
        "#4eccc6", "#5559df", "#401694", "#563e3e", "#bda8f9",
        "#2b76e5", "#a9bee8", "#d974b0", "#9d99b9", "#ad967a",
        "#a1e3f6", "#bd816e", "#175a63"
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
        <div className="dashboard">
            <Bar data={data} options={options}/>
        </div>
    )
}