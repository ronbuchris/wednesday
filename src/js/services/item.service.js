import { storageService } from './async-storage.service'

const STORAGE_KEY = 'workspaceDB';

export const itemService = {
    save,
    remove,
    getById,
    onPost,
    createItem
}

async function getById(board, itemId) {
    const group = board.groups.find(group => group.items.find(item => item.id === itemId));
    const item = group.items.find(item => item.id === itemId)
    return Promise.resolve(item)
}

async function onPost(update, user, item, workspace) {
    const newUpdate = createUpdate(update.txt, user)
    item.updates.unshift(newUpdate)
    await storageService.put(STORAGE_KEY, workspace)
    return Promise.resolve(workspace)
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

async function remove(workspace, group, itemId) {
    const itemIdx = group.items.findIndex(item => item.id === itemId);
    group.items.splice(itemIdx, 1)
    const returnedWorkspace = { ...workspace }
    return returnedWorkspace

}

function save(item, group, workspace, user, addToTop) {
    if (item.id) {
        const itemIdx = group.items.findIndex(currItem => currItem.id === item.id);
        group.items[itemIdx].splice(itemIdx, 1, item);
    } else {
        const newItem = createItem(item, user)
        addToTop ? group.items.unshift(newItem) : group.items.push(newItem)
    }
    const newWorkspace = { ...workspace };
    return newWorkspace
}
// async function saveItem(newItem, groupId, workspace) {
//     return workspace.boards.forEach((board) => {
//         return board.groups.forEach((group) => {
//             if (newItem.id) {
//                 const itemId = newItem.id;
//                 group.items.forEach((item, idx) => {
//                     if (item.id === itemId) {
//                         group.items.splice(idx, 1, newItem)
//                         storageService.put(STORAGE_KEY, workspace)
//                         return newItem;
//                     }
//                 })
//             } else if (!newItem.id) {
//                 if (group.id === groupId) {
//                     const addItem = createItem(newItem)
//                     if (addItem.title === 'New Item') {
//                         group.items.unshift(addItem)
//                     } else {
//                         group.items.push(addItem)
//                     }
//                     storageService.put(STORAGE_KEY, workspace)
//                     return addItem;
//                 }
//             }
//         })

//     })
// }

export function createItem(title, user) {
    return {
        id: makeId(),
        title,
        columns: [
            {
                type: "member",
                members: [
                    {
                        _id: "u101",
                        fullname: "Adir Cohen",
                        img: `https://robohash.org/adir`,
                    }
                ]
            },
            {
                type: "status",
                label: {
                    title: "",
                    color: "#c4c4c4"
                }

            },
        ],
        creator: {
            _id: user._id,
            fullname: user.fullname,
            img: user.img
        },
        createdAt: Date.now(),
    }
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