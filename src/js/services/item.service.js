import { storageService } from './async-storage.service'

const STORAGE_KEY = 'workspaceDB';

export const itemService = {
    save,
    remove
}
async function remove(workspace, group, itemId) {
    const itemIdx = group.items.findIndex(item => item.id === itemId);
    group.items.splice(itemIdx, 1)
    storageService.put(STORAGE_KEY, workspace)

}

async function save(newItem, groupId, workspace) {
    return workspace.boards.forEach((board) => {
        return board.groups.forEach((group) => {
            if (newItem.id) {
                const itemId = newItem.id;
                group.items.forEach((item, idx) => {
                    if (item.id === itemId) {
                        group.items.splice(idx, 1, newItem)
                        storageService.put(STORAGE_KEY, workspace)
                        return newItem;
                    }
                })
            } else if (!newItem.id) {
                if (group.id === groupId) {
                    const addItem = _createItem(newItem)
                    if (addItem.title === 'New Item') {
                        group.items.unshift(addItem)
                    } else {
                        group.items.push(addItem)
                    }
                    storageService.put(STORAGE_KEY, workspace)
                    return addItem;
                }
            }
        })

    })
}





export function createItem(newItem) {
    return {
        "id": makeId(),
        "title": newItem,
        "columns": [
            {
                "type": "member",
                "members": [
                    {
                        "_id": "u101",
                        "fullname": "Adir Cohen",
                        "img": `https://robohash.org/adir`,
                    }
                ]
            },
            {
                "type": "status",
                "label": {
                    "title": "Done",
                    "color": "green"
                }

            },
        ],
        "createdAt": new Date(),
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