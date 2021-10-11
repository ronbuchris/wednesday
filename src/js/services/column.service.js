import { makeId } from '../services/util.service'
import { createLabel } from './label.service'

export function createColumn(column) {
    switch (column) {
        case 'status':
            return {
                id: makeId(),
                type: 'status',
                title: 'Status',
                width: 150,
                labels: [
                    createLabel('#c4c4c4', ''),
                    createLabel('#00c875', 'Done'),
                    createLabel('#e2445c', 'Stuck'),
                    createLabel('#fdab3d', 'Working on it'),
                ]
            }
        case 'date':
            return {
                id: makeId(),
                type: 'date',
                title: 'Date',
                width: 140,
                date: ''
            }
        case 'member':
            return {
                id: makeId(),
                type: "member",
                title: 'Person',
                width: 150,
            }
        case 'number':
            return {
                id: makeId(),
                type: "number",
                title: "Number",
                width: 150,
                number: ''

            }

        default:
            break;
    }
}