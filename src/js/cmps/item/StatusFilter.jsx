


export function StatusFilter({ board, onFilterStatus }) {
    return (
        <div>
            {board.columns[1].labels.map(label => {
                return <div key={label.color} onClick={() => {
                    onFilterStatus(label.title)
                }}>
                    {label.title}
                </div>
            })}
        </div>
    )
}