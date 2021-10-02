export const itemService = {
    save,
    remove,
    getById,
    onPost,
    createItem,
    getStatuses
}

const gCmpsOrder = ["member", "status", "date"]

function getById(board, itemId) {
    const group = board.groups.find(group => group.items.find(item => item.id === itemId));
    const item = group.items.find(item => item.id === itemId)
    return item
}

function getStatuses(board) {
    // define object
    // push the key 
    /*
    {
        Done: {
            count: 2,
            color: green
        },
        Stuck: {
            count: 3,
            color: red
        },
        Working on it: {
            count: 1,
            color: orange
        }
    }
    */
    const statuses = {}
    const colors = {}
    const statusIdx = board.cmpsOrder.findIndex(cmpOrder => cmpOrder === 'status')
    board.groups.forEach(group => {
        group.items.forEach(item => {
            const color = item.columns[statusIdx].label.color
            const status = item.columns[statusIdx].label.title === '' ? 'No Status' : item.columns[statusIdx].label.title
            if (statuses.status) {
                statuses.count++
            } else {
                statuses.count = 1
                colors.color = color
            }
        })
    })
    return [statuses, colors]
}
// Done: {
//     count:2, 
//     color: green
// }
function onPost(update, user, item, workspace) {
    const newUpdate = createUpdate(update.txt, user)
    item.updates.unshift(newUpdate)
    const newWorkspace = { ...workspace };
    return newWorkspace
}

function createUpdate(txt, user) {
    return {
        id: makeId(),
        txt,
        createBy: {
            _id: user._id,
            fullname: user.fullname,
            img: user.img
        },
        createAt: Date.now()
    }
}

function remove(workspace, group, itemId) {
    const itemIdx = group.items.findIndex(item => item.id === itemId);
    group.items.splice(itemIdx, 1)
    const returnedWorkspace = { ...workspace }
    return returnedWorkspace

}

function save(item, group, workspace, user, addToTop, board) {
    if (item.id) {
        const itemIdx = group.items.findIndex(currItem => currItem.id === item.id);
        group.items.splice(itemIdx, 1, item);
    } else {
        const newItem = createItem(item, user, board)
        addToTop ? group.items.unshift(newItem) : group.items.push(newItem)
    }
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
    }
}

function _addCmpsOrder(cmpsOrder) {
    const columns = []
    const members = {
        type: "member",
        members: [
            {
                _id: "u101",
                fullname: "Adir Cohen",
                img: `https://robohash.org/adir`,
            }
        ]
    }
    const status = {
        type: "status",
        label: {
            title: "",
            color: "#c4c4c4"
        }
    }

    const date = {
        type: "date",
        date: ''
    }

    cmpsOrder.forEach((cmpOrder) => {
        if (cmpOrder === "member") columns.push(members)
        if (cmpOrder === "status") columns.push(status)
        if (cmpOrder === "date") columns.push(date)
    })
    return columns

}


function makeId(length = 6) {
    var txt = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}