export function StatusFilter({ board, onFilterStatus }) {
  const statusIdx = () => {
    return board.columns.findIndex((column) => column.type === 'status');
  };
  return (
    <div className="column-option">
      <div className="title">Status</div>
      <div className="options-container flex column">
        {board.columns[statusIdx()].labels.map((label) => {
          return (
            <div
              className="flex"
              key={label.color}
              onClick={() => {
                onFilterStatus(label.title);
              }}
            >
              <div>{label.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
