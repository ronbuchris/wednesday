export function StatusFooter({ board, group, column }) {
  const getStatusMap = () => {
    let statusToShow = [];
    const statusMap = group.items.reduce(
      (acc, item) => {
        const statusIdx = item.columns.findIndex(
          (column) => column.type === 'status'
        );
        acc.totalCount++;
        const title = item.columns[statusIdx].label.title;
        const color = item.columns[statusIdx].label.color;
        if (acc[title]) {
          acc[title].count++;
        } else {
          statusToShow.push(title);
          acc[title] = {};
          acc[title].count = 1;
          acc[title].color = color;
        }
        acc.statusToShow = statusToShow;
        return acc;
      },
      { totalCount: 0 }
    );
    return statusMap;
  };

  const statusMap = getStatusMap();

  return (
    <div style={{ minWidth: column.width }} className="status-footer flex">
      <div className="battery-container flex align-center">
        {statusMap.statusToShow?.map((status) => {
          return (
            <div
              key={status}
              className="battery-status tooltip"
              style={{
                width:
                  (statusMap[status].count / statusMap.totalCount) * 100 + '%',
                backgroundColor: statusMap[status].color,
              }}
            >
              <span className="tooltiptext">
                {`${status} ${statusMap[status].count}/${
                  statusMap.totalCount
                } ${(
                  (statusMap[status].count / statusMap.totalCount) *
                  100
                ).toFixed(1)}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
