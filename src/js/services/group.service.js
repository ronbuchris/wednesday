import { createItem } from './item.service'
var randomColor = require('randomcolor');

export const groupService = {
    createGroup,
    query,
    removeGroup,
    save
}

function query(board) {
    return board.groups
}

//EDIT-ADD GROUP
function save(workspace, board, group, user, groupId, Duplicate) {
    const groupIdx = board.groups.findIndex(currGroup => currGroup.id === groupId);
    if (Duplicate || groupId) {
        const newGroup = Duplicate ? {
            ...group, title: `Duplicate ${group.title}`, id: makeId(),
            items: group.items.map(item =>{
                return {...item,id:makeId(),}
            })}:createGroup(user, board)
        board.groups.splice(groupIdx+1, 0, newGroup);
    }
    else if (group.id) {
        const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id);
        board.groups.splice(groupIdx, 1, group);
    } else {
        const newGroup = createGroup(user,board)
        board.groups.unshift(newGroup)
    }
    const newWorkspace = { ...workspace };
    return newWorkspace
}

function removeGroup(workspace, board, groupId) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId);
    board.groups.splice(groupIdx, 1)
    const returnedWorkspace = { ...workspace }
    return returnedWorkspace
}

export function createGroup(user,board, itemCount = 1) {
    const items = []
    for (var i = 0; i < itemCount; i++) {
        const item = createItem("New Item", user,board)
        items.push(item)
    }
    const group = {
        "id": makeId(),
        "title": "New Group",
        items,
        "style": {
            "color": randomColor({
                luminosity: 'dark',
                format: 'rgba',
                alpha: 0.9
             }),
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

