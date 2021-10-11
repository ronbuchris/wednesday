import { groupService } from "../../services/group.service";
import { itemService } from "../../services/item.service";
import { workspaceService } from '../../services/workspace.service'

export function loadItems(group) {
    return async dispatch => {
        try {
            dispatch({
                type: 'SET_ITEMS',
                items: group.items
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function onPost(update, user, item, groups, workspace) {
    return async dispatch => {
        try {
            const newWorkspace = itemService.onPost(update, user, item, groups, workspace)
            await workspaceService.save(newWorkspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace
            })
        } catch (err) {
            console.log('Cannot add update', err)

        }

    }
}

export function toggleSelected(board, selectedItems) {
    return dispatch => {
        const newBoard = JSON.parse(JSON.stringify(board))
        dispatch({
            type: 'TOGGLE_SELECT',
            selectedItems
        })
        dispatch({
            type: 'SET_BOARD',
            board: newBoard
        })
        dispatch({
            type: 'SET_GROUPS',
            groups: newBoard.groups
        })
    }
}

export function loadStatuses(board) {
    return async dispatch => {
        try {
            const statuses = itemService.getStatuses(board)
            dispatch({
                type: 'GET_STATUS',
                statuses
            })

        } catch (err) {
            console.log('Cannot search item', err)
        }
    }
}
export function getNumbers(board) {
    return async dispatch => {
        try {
            const numbers = itemService.getNumbers(board)
            dispatch({
                type: 'GET_NUMBERS',
                numbers
            })

        } catch (err) {
            console.log('Cannot search item', err)
        }
    }
}
export function getPersonItem(board) {
    return async dispatch => {
        try {
            const personsCount = itemService.getPersonItem(board)
            dispatch({
                type: 'GET_PERSONS',
                personsCount
            })

        } catch (err) {
            console.log('Cannot search item', err)
        }
    }
}
export function getDateData(board) {
    return async dispatch => {
        try {
            const dateCounter = itemService.getDateData(board)
            dispatch({
                type: 'GET_DATE',
                dateCounter
            })

        } catch (err) {
            console.log('Cannot search item', err)
        }
    }
}
export function getGroupItemsCount(board) {
    return async dispatch => {
        try {
            const groupItemsCount = itemService.getGroupItemsCount(board)
            dispatch({
                type: 'GET_ITEM_COUNT',
                groupItemsCount
            })

        } catch (err) {
            console.log('Cannot search item', err)
        }
    }
}

export function onSetSearch(board, searchBy) {
    return (dispatch) => {
        const groups = groupService.query(board, { searchBy })
        try {
            dispatch({
                type: 'SET_GROUPS',
                groups
            })
        } catch (err) {
            console.log('Cannot search item', err)
        }
    }
}

export function loadItem(board, itemId) {
    return (dispatch) => {
        try {
            const item = itemService.getById(board, itemId)
            dispatch({
                type: 'SET_ITEM',
                item
            })
        } catch (err) {
            console.log('Cannot load item', err)
        }
    }
}

export function onSort(board, sortStore) {
    return (dispatch) => {
        try {
            const groups = groupService.query(board, { sortStore })
            dispatch({
                type: 'SET_GROUPS',
                groups
            })
            dispatch({
                type: 'SORT',
                sortStore
            })
        } catch (err) {
            console.log('Cannot sort item', err)
        }
    }
}

export function removeItem(workspace, groupOrBoard, itemId, board) {
    return async (dispatch) => {
        try {
            if (typeof itemId === 'string') {
                var newWorkspace = itemService.remove(workspace, groupOrBoard, itemId, board)
            } else {
                var newWorkspace = itemService.removeSelected(workspace, groupOrBoard, itemId)
                dispatch({
                    type: 'TOGGLE_SELECT',
                    selectedItems: []
                })

            }
            await workspaceService.save(newWorkspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace
            })

        } catch (err) {
            console.log('Cannot remove item', err)
        }
    }
}

export function saveItem(item, user, workspace, group, addToTop, board, Duplicate) {
    return async (dispatch) => {
        try {
            const newWorkspace = itemService.save(item, group, workspace, user, addToTop, board, Duplicate)
            await workspaceService.save(newWorkspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace,
            })
        } catch (err) {
            console.log('Cannot add item', err)
        }
    }
}

export function duplicateItems(workspace, board, selectedItems) {
    return async (dispatch) => {
        try {
            const newWorkspace = itemService.duplicateItems(workspace, board, selectedItems)
            await workspaceService.save(newWorkspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace,
            })
            dispatch({
                type: 'TOGGLE_SELECT',
                selectedItems: []
            })
        } catch (err) {
            console.log('Cannot add item', err)
        }
    }
}
