import { storageService } from './async-storage.service'
import { createItem } from './item.service'

const STORAGE_KEY = 'workspaceDB';

export const groupService = {
    save
}

async function save(newGroup, boardForAdd) {
    const workspaces = await storageService.query(STORAGE_KEY)
    return workspaces.find(workspace => {
        return workspace.boards.find((board) => {
            if (boardForAdd) {
                if (board._id === boardForAdd._id) {
                    const newAddGroup = createGroup();
                    board.groups.unshift(newAddGroup);
                    return storageService.put(STORAGE_KEY, workspace)
                }
            } else {
                const groupId = newGroup.id;
                board.groups.forEach((group, idx) => {
                    if (group.id === groupId) {
                        board.groups.splice(idx, 1, newGroup)
                        return storageService.put(STORAGE_KEY, workspace)
                    }
                })
            }
        })
    })
}

export function createGroup(user, itemCount = 1) {
    const items = []
    for (var i = 0; i < itemCount; i++) {
        items.push(createItem("New Item", user))
    }

    return {
        "id": makeId(),
        "title": "New Group",
        items,
        "style": {
            "color": "brown",
        }
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
