import { makeId } from '../services/util.service'
import { createItem } from './item.service'
import { createActivity } from './board.service'
var randomColor = require('randomcolor');

export const groupService = {
    createGroup,
    query,
    removeGroup,
    save
}

function query(board, ActionBy = {}) {
    var groups = []
    if (ActionBy) {
        if (ActionBy.searchBy?.itemTitle) {
            groups = searchItem(board, ActionBy)
        } else {
            groups = board.groups
        }
        if (ActionBy.groupsIds || ActionBy.statuses) {
            groups = filterGroups(board, ActionBy)
            if (ActionBy?.statuses?.length) {
                const statusIdx = board.cmpsOrder.findIndex((cmpOrder) => cmpOrder === 'status');
                const groupsToFilter = groups?.length ? groups : board.groups
                groups = filterStatus(ActionBy, groupsToFilter, statusIdx)
            }
            if (ActionBy?.persons?.length) {
                groups = filterPersons(board, ActionBy)
            }
        }
        if (ActionBy?.sortStore) {
            if (ActionBy.sortStore.sortBy === 'Select sort by') {
                return board.groups
            } else {
                groups = sortGroups(board, ActionBy)
            }
        }
    }
    if (!ActionBy.sortStore) {
        groups = groups.filter((group, idx) => {
            if (group.items?.length) {
                return group
            } else {
                groups.splice(idx, 1)
            }
        })
    }
    const { searchBy, statuses, groupsIds, sortStore, persons } = ActionBy
    const groupsToReturn = (searchBy || statuses?.length || groupsIds?.length || sortStore || persons?.length) ? groups : board.groups
    return groupsToReturn
}

// Filter/Sort/Search
function searchItem(board, ActionBy) {
    var groups = []
    groups = board.groups.map(group => {
        return {
            ...group, items: group.items.filter(item => {
                return item.title.toLowerCase().includes(ActionBy.searchBy.itemTitle.toLowerCase())
            })
        }
    })
    return groups
}

function sortGroups(board, ActionBy) {
    const { sortBy, sortOrder } = ActionBy.sortStore
    var groups = []
    const statusIdx = board.columns.findIndex(column => column.type === 'status')
    const dateIdx = board.columns.findIndex(column => column.type === 'date')
    groups = board.groups.map(group => {
        return {
            ...group, items: group.items.sort((a, b) => {
                if (sortBy === 'Text') {
                    if (sortOrder === 'Ascending') {
                        return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                    } else {
                        return b.title.toLowerCase().localeCompare(a.title.toLowerCase())
                    }
                }
                if (sortBy === 'Status') {
                    if (sortOrder === 'Ascending') {
                        return a.columns[statusIdx].label.title.localeCompare(b.columns[statusIdx].label.title)
                    } else {
                        return b.columns[statusIdx].label.title.localeCompare(a.columns[statusIdx].label.title)
                    }
                }
                if (sortBy === 'Date') {
                    if (sortOrder === 'Ascending') {
                        return a.columns[dateIdx].date - b.columns[dateIdx].date
                    } else {
                        return b.columns[dateIdx].date - a.columns[dateIdx].date
                    }
                }
            })
        }
    })
    return groups
}

function filterGroups(board, ActionBy) {
    var groups = []
    groups = board.groups.filter(group => {
        return ActionBy.groupsIds.includes(group.id)
    })
    return groups
}

function filterPersons(board, ActionBy) {
    const memberIdx = board.cmpsOrder.findIndex(cmp => cmp === 'member')
    const filteredGroups = board.groups.reduce((acc, group) => {
        const newGroup = {
            ...group, items: group.items.filter(item => {
                return item.columns[memberIdx].members.some(member => {
                    return ActionBy.persons.includes(member._id)
                })
            })
        }
        acc.push(newGroup)
        return acc
    }, [])
    return filteredGroups
}

function filterStatus(ActionBy, groupsToFilter, statusIdx) {
    var groups = []
    groups = groupsToFilter.map(group => {
        return {
            ...group, items: group.items.filter(item => {
                return ActionBy.statuses.includes(item.columns[statusIdx].label.title)
            })
        }
    })
    return groups
}

//EDIT-ADD GROUP
function save(workspace, board, group, user, groupId, Duplicate) {
    const groupIdx = board.groups.findIndex(currGroup => currGroup.id === groupId);
    if (Duplicate || groupId) {
        const newGroup = Duplicate ? duplicateGroup(group) : createGroup(user, board)
        Duplicate ? createActivity('Duplicated Group', board) : createActivity('Updated Group', board)
        board.groups.splice(groupIdx + 1, 0, newGroup);
    }
    else if (group.id) {
        const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id);
        createActivity('Duplicated Group', board)
        board.groups.splice(groupIdx, 1, group);
    } else {
        const newGroup = createGroup(user, board)
        createActivity('Created Group', board)
        board.groups.unshift(newGroup)
    }
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx, 1, board)
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
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx, 1, board)
    createActivity('Removed Group', board)
    const newWorkspace = { ...workspace };
    return newWorkspace
}
