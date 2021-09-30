


export function StatusFilter({ board, onFilterStatus }) {
    const statusIdx = () => {
        return board.columns.findIndex((column) => column.type === 'status');
    };
    return (
        <div>
            {board.columns[statusIdx()].labels.map(label => {
                return <div key={label.color} onClick={() => {
                    onFilterStatus(label.title)
                }}>
                    {label.title}
                </div>
            })}
        </div>
    )
}