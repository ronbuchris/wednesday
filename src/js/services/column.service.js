import { makeId } from '../services/util.service'
import { createLabel } from './label.service'



function save(column, workspace, board) {
    if (column?.id) {

    } else {
        const newColumn = createColumn(column);
        board.columns.push(newColumn);
    }

    return { ...workspace }
}

export function createColumn(column) {
    switch (column) {
        case 'status':
            return {
                id: makeId(),
                title: 'Status',
                width: 150,
                labels: [
                    createLabel('#c4c4c4', ''),
                    createLabel('#00c875', 'Done'),
                    createLabel('#e2445c', 'Stuck'),
                    createLabel('#fdab3d', 'Working on it'),
                ]
            }
            break;

        default:
            break;
    }
}