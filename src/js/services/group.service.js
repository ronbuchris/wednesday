import { createItem } from './item.service'

export const groupService = {
    createGroup,
    query,
    removeGroup,
    editGroup
}

function query(board) {
    return board.groups
}

//EDIT-ADD GROUP
function editGroup(workspace, board, group, user) {
    const newWorkspace = { ...workspace };
    if (group.id) {
        const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id);
        const boardIdx = workspace.boards.findIndex(currBoard => currBoard._id === board._id);
        board.groups.splice(groupIdx, 1, group);
        newWorkspace.boards.splice(boardIdx, 1, board);
    } else {
        const newGroup = createGroup(user)
        const newBoard = { ...board, groups: [newGroup, ...board.groups] };
        const boardIdx = workspace.boards.findIndex(currBoard => currBoard._id === board._id);
        newWorkspace.boards.splice(boardIdx, 1, newBoard);
    }
    return newWorkspace
}


function removeGroup(workspace, board, groupId) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId);
    board.groups.splice(groupIdx, 1)
    const returnedWorkspace = { ...workspace }
    return returnedWorkspace
}

export function createGroup(user, itemCount = 1) {
    const items = []
    for (var i = 0; i < itemCount; i++) {
        const item = createItem("New Item", user)
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
    return group
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

