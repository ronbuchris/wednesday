export function StatusFilter({ board, onFilterStatus, filterByStatus }) {
  const statusIdx = () => {
    return board.columns.findIndex((column) => column.type === 'status');
  };

  const isFilter = (label) => {
    return filterByStatus.includes(label);
  };
  return (
    <div className="column-option">
      <div className="title">Status</div>
      <div className="options-container flex column">
        {board.columns[statusIdx()].labels.map((label) => {
          return (
            <div
              className={`flex filter-item align-center br4 header-btn space-between ${
                isFilter(label.title) ? 'filter' : ''
              }`}
              key={label.color}
              onClick={() => {
                onFilterStatus('',label.title, false);
              }}
            >
              <div className="flex align-center">
                <div
                  className="color-div"
                  style={{ backgroundColor: label.color }}
                ></div>
                <div>{label.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
