import React from 'react';


export function StatusFooter({board,group,column}) {
    const getStatusMap = () => {
        console.log(group);
    const statusIdx = board.cmpsOrder.findIndex(cmpOrder => cmpOrder === 'status')
    const statusMap =group.items.reduce((acc, item) => {
        acc.totalCount++
        const title = item.columns[statusIdx].label.title
        const color = item.columns[statusIdx].label.color
        if (acc[title]) {
            acc[title].count++;
        } else {
            acc[title] = {};
            acc[title].count = 1;
            acc[title].color = color;
        }
        return acc;
    }, { totalCount: 0 });
        console.log('statusMap', statusMap);
}

        return (
            <div style={{ minWidth: column.width }} className="status-footer">
                {getStatusMap()}
            </div>
        )
}

