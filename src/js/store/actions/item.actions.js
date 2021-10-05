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

export function onSort(board,  sortType ) {
    console.log(sortType);
    return (dispatch) => {
        try {
            const groups = groupService.query(board,  {sortType})
            dispatch({
                type: 'SET_GROUPS',
                groups
            })
        } catch (err) {
            console.log('Cannot sort item', err)
        }
    }
}

export function removeItem(workspace, group, itemId) {
    return async (dispatch) => {
        try {
            const newWorkspace = itemService.remove(workspace, group, itemId)
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
