
import { makeId } from '../services/util.service'

export const labelService = {
    save,
    remove
}

const gColors = ["#ff5ac4", "#ff158a", "#bb3354", "#7f5347",
    "#ff642e", "#ffcb00", "#cab641", "#9cd326",
    "#037f4c", "#0086c0", "#579bfc", "#66ccff", "#a25ddc",
    "#784bd1", "#808080", "#333333", "#ff7575", "#faa1f1",
    "#ffadad", "#7e3b8a", "#9aadbd", "#68a1bd", "#225091",
    "#4eccc6", "#5559df", "#401694", "#563e3e", "#bda8f9",
    "#2b76e5", "#a9bee8", "#d974b0", "#9d99b9", "#ad967a",
    "#a1e3f6", "#bd816e", "#175a63",
]

export function queryColors() {
    return gColors
}

function save(workspace, board, columnIdx, label = null, labelIdx, prevColor, type) {
    if (label?.id) {
        if (type === "color") {
            const prevColorIdx = gColors.findIndex(color => color === label.color);
            gColors.splice(prevColorIdx, 1, prevColor)
        }

        board.groups.forEach(group => {
            return group.items.forEach(item => {
                const currLabel = item.columns[columnIdx].label
                if (currLabel.id === label.id) currLabel[type] = label[type]
            })
        })
    } else {
        const newLabel = createLabel(label)
        board.columns[columnIdx].labels.push(newLabel)
    }
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx,1,board)
    const newWorkspace = { ...workspace };
    return newWorkspace
}

function remove(labelIdx, board, columnIdx, workspace) {
    const removedLabel = board.columns[columnIdx].labels.splice(labelIdx, 1)
    gColors.push(removedLabel[0].color)
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx,1,board)
    const newWorkspace = { ...workspace };
    return newWorkspace
}

function createLabel(color = null, title = null) {
    const colorIdx = gColors.findIndex(currColor => currColor === color)
    return {
        id: makeId(),
        title: title || '',
        color: gColors.splice(color ? colorIdx : (Math.floor(Math.random() * gColors.length)), 1)[0]
    }
}