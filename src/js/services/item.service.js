import { makeId } from '../services/util.service'

export const itemService = {
    duplicateItems,
    removeSelected,
    getPersonItem,
    getStatuses,
    createItem,
    getById,
    remove,
    onPost,
    save,
}

const gCmpsOrder = ["member", "status", "date"]

function getById(board, itemId) {
    const group = board.groups.find(group => group.items.find(item => item.id === itemId));
    const item = group.items.find(item => item.id === itemId)
    return item
}

function getStatuses(board) {
    const statuses = {}
    const colors = {}
    const statusIdx = board.cmpsOrder.findIndex(cmpOrder => cmpOrder === 'status')
    board.groups.forEach(group => {
        group.items.forEach(item => {
            const color = item.columns[statusIdx].label.color
            const status = item.columns[statusIdx].label.title === '' ? 'No Status' : item.columns[statusIdx].label.title
            if (statuses[status]) {
                statuses[status]++
            } else {
                colors[status] = color
                statuses[status] = 1
            }
        })
    })
    return [statuses, colors]
}
function getPersonItem(board) {
    let personsToShow = [];
    const personsMap = board.groups.map(group => {
        return group.items.reduce((acc, item) => {
            const memberIdx = item.columns.findIndex(column => column.type === 'member')
            acc.totalCount++;
            const members = item.columns[memberIdx].members;
            members.forEach(member => {
                const name = member.fullname
                if (acc[name]) {
                    acc[name].count++;
                } else {
                    personsToShow.push(name);
                    acc[name] = {};
                    acc[name].count = 1;
                }
            })
            acc.personsToShow = personsToShow;
            return acc;
        },
        { totalCount: 0 }
        );
    })
    return personsMap;
}

function onPost(update, user, item, groups, workspace) {
    const newUpdate = createUpdate(update, user)
    item.updates.unshift(newUpdate)
    const group = groups.find(group => {
        return group.items.find(gItem => gItem.id === item.id)
    })
    const itemIdx = group.items.findIndex(gItem => gItem.id === item.id)
    const newItem = { ...item }
    group.items.splice(itemIdx, 1, newItem)
    const newWorkspace = { ...workspace };
    return newWorkspace
}

function createUpdate(txt, user) {
    return {
        id: makeId(),
        txt,
        createdBy: {
            _id: user._id,
            fullname: user.fullname,
            img: user.img
        },
        createdAt: Date.now()
    }
}

function remove(workspace, group, itemId, board) {
    const itemIdx = group.items.findIndex(item => item.id === itemId);
    group.items.splice(itemIdx, 1)
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx, 1, board)
    const returnedWorkspace = { ...workspace }
    return returnedWorkspace
}

function removeSelected(workspace, board, itemsIds) {
    board.groups.forEach(group => {
        itemsIds.forEach(itemId => {
            const itemIdx = group.items.findIndex(item => item.id === itemId);
            if (itemIdx !== -1) {
                group.items.splice(itemIdx, 1)
            }
        })
    })
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx, 1, board)
    const returnedWorkspace = JSON.parse(JSON.stringify(workspace))
    return returnedWorkspace
}

function duplicateItem(item) {

    return {
        ...item,
        title: `${item.title} (copy)`,
        id: makeId(),
        updates: [],
    }
}

function save(item, group, workspace, user, addToTop, board, Duplicate) {
    const itemIdx = group.items.findIndex(currItem => currItem.id === item.id);
    if (Duplicate || item.id) {
        const itemToCopy = JSON.parse(JSON.stringify(item))
        const newItem = Duplicate ? duplicateItem(itemToCopy) : item
        Duplicate ? group.items.splice(itemIdx + 1, 0, newItem)
            : group.items.splice(itemIdx, 1, item)
    } else {
        const newItem = createItem(item, user, board)
        addToTop ? group.items.unshift(newItem) : group.items.push(newItem)
    }
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx, 1, board)
    const newWorkspace = { ...workspace };
    return newWorkspace
}

function duplicateItems(workspace, board, itemsIds) {
    board.groups.forEach(group => {
        itemsIds.forEach(itemId => {
            const itemIdx = group.items.findIndex(item => item.id === itemId);
            if (itemIdx !== -1) {
                const item = group.items.find(item => item.id === itemId);
                const itemToCopy = JSON.parse(JSON.stringify(item))
                const newItem = duplicateItem(itemToCopy)
                group.items.splice(itemIdx + 1, 0, newItem)
            }
        })
    })
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx, 1, board)
    const newWorkspace = { ...workspace };
    return newWorkspace
}


export function createItem(title, user, board) {
    const cmpOrder = board.cmpsOrder ? board.cmpsOrder : gCmpsOrder
    return {
        id: makeId(),
        title,
        columns: _addCmpsOrder(cmpOrder),
        creator: {
            _id: user._id,
            fullname: user.fullname,
            img: user.img
        },
        updates: [],
        createdAt: Date.now(),
        activities: [],
        isSelected: false,
    }
}

function _addCmpsOrder(cmpsOrder) {
    const columns = []
    const members = {
        type: "member",
        members: []
    }
    const status = {
        type: "status",
        label: {
            id: makeId(),
            title: "",
            color: "#c4c4c4"
        }
    }

    const date = {
        type: "date",
        date: ''
    }

    const number = {
        type: "number",
        title: "Number",
        number: ''
    }

    cmpsOrder.forEach((cmpOrder) => {
        if (cmpOrder === "member") columns.push(members)
        if (cmpOrder === "status") columns.push(status)
        if (cmpOrder === "number") columns.push(number)
        if (cmpOrder === "date") columns.push(date)
    })
    return columns

}