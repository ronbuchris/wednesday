import { makeId } from '../services/util.service'
import { createItem } from './item.service'
var randomColor = require('randomcolor');

export const groupService = {
    createGroup,
    query,
    removeGroup,
    save
}

function query(board, ActionBy ={}) {
    var groups = []
    if(ActionBy) {
        if(ActionBy.searchBy?.itemTitle) {
            groups = board.groups.map(group => {
                return {...group, items: group.items.filter(item => {
                        return item.title.toLowerCase().includes(ActionBy.searchBy.itemTitle.toLowerCase())
                    })
                }
            })
        } else {
            groups = board.groups
        }
        if (ActionBy?.sortType) {
            groups = board.groups.map(group => {
                return {...group, items: group.items.sort((a, b) => {
                    if (ActionBy.sortType === 'A-Z') {
                            return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                        } else if (ActionBy.sortType === 'Z-A') {
                            if (a.title.toLowerCase() > b.title.toLowerCase())
                                return -1;
                            if (a.title.toLowerCase() < b.title.toLowerCase())
                                return 1;
                            return 0;
                        }
                    })
                }
            })
        }
        if (ActionBy.groupsIds || ActionBy.statuses ) {
            groups = board.groups.filter(group => {
                return ActionBy.groupsIds.includes(group.id)
            })
            if (ActionBy?.statuses?.length) {
                const statusIdx = board.cmpsOrder.findIndex((cmpOrder) => cmpOrder === 'status');
                const groupsToFilter = groups?.length ? groups : board.groups
                groups = groupsToFilter.map(group => {
                    return {...group, items: group.items.filter(item => {
                        return ActionBy.statuses.includes(item.columns[statusIdx].label.title)
                    })
                }
            })
        }
        }
    }
    groups = groups.filter((group, idx) => {
        if (group.items?.length) {
            return group
        } else {
            groups.splice(idx, 1)
        }
    })
    const { searchBy, statuses, groupsIds } = ActionBy
    const groupsToReturn = (searchBy || statuses?.length || groupsIds?.length) ? groups : board.groups
    return groupsToReturn
}

//EDIT-ADD GROUP
function save(workspace, board, group, user, groupId, Duplicate) {
    const activity = {
        id: makeId(),
        createdAt: Date.now(),
        activity: 'add group',
        createdBy: {
            _id: user._id,
            fullname: user.fullname,
            img: user.img
        }
    }
    board.activities.push(activity)
    const groupIdx = board.groups.findIndex(currGroup => currGroup.id === groupId);
    if (Duplicate || groupId) {
        const newGroup = Duplicate ? duplicateGroup(group) : createGroup(user, board)
        board.groups.splice(groupIdx + 1, 0, newGroup);
    }
    else if (group.id) {
        const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id);
        board.groups.splice(groupIdx, 1, group);
    } else {
        const newGroup = createGroup(user, board)
        board.groups.unshift(newGroup)
    }
    const newWorkspace = { ...workspace };
    return newWorkspace
}

function duplicateGroup(group) {
    return {
        ...group,
        title: `Duplicate of ${group.title}`,
        id: makeId(),
        items: group.items.map(item => {
            return {
                ...item, id: makeId(),
                updates: [],
                columns: item.columns.map(column => {
                    return { ...column }
                })
            }
        })
    }
}

export function createGroup(user, board, itemCount = 1) {
    const items = []
    for (var i = 0; i < itemCount; i++) {
        const item = createItem("New Item", user, board)
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

function removeGroup(workspace, board, groupId) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId);
    board.groups.splice(groupIdx, 1)
    const newWorkspace = { ...workspace };
    return newWorkspace
}
