import { storageService } from './async-storage.service'
import { createItem } from './item.service'

const STORAGE_KEY = 'workspaceDB';

export const groupService = {
    save,
    createGroup,
    query,
    removeGroup
}

function query(board) {
    return board.groups
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

    function removeGroup(workspace, board, groupId) {
        const groupIdx = board.groups.findIndex(group => group.id === groupId);
        board.groups.splice(groupIdx, 1)
        const returnedWorkspace = { ...workspace }
        return returnedWorkspace
    }


    export async function createGroup(user, itemCount = 1) {
        const items = []
        for (var i = 0; i < itemCount; i++) {
            const item = await createItem("New Item", user)
            items.push(item)
        }
        const group = {
            "id": makeId(),
            "title": "New Group",
            items,
            "style": {
                "color": "brown",
            }
        }
        return Promise.resolve(group)

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

