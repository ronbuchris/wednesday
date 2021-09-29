import { workspaceService } from "../../services/workspace.service";
import { groupService } from "../../services/group.service";
import { boardService } from "../../services/board.service";

export function setGroup(group) {
    return async dispatch => {
        try {
            dispatch({
                type: 'SET_GROUP',
                group
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}



export function editGroup(workspace, board, group, user) {
    return async (dispatch) => {
        try {
            const newWorkspace = groupService.save(workspace, board, group, user)
            const newBoard = boardService.getById(newWorkspace, board._id)
            await workspaceService.save(newWorkspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace,
            })
            dispatch({
                type: 'SET_GROUPS',
                groups: newBoard.groups,
            })
        } catch (err) {
            console.log('Cannot edit group', err)
        }
    }
}

export function loadGroups(board) {
    return dispatch => {
        try {
            const groups = groupService.query(board)
            dispatch({
                type: 'SET_GROUPS',
                groups
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function filterGroups(board, groupsIds, statuses) {
    return async dispatch => {
        try {

            dispatch({
                type: 'SET_FILTER',
                groupsIds,
                statuses,
                board
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function filterStatus(board, statuses, groupsIds) {
    return async dispatch => {
        try {
            dispatch({
                type: 'SET_FILTER',
                board,
                statuses,
                groupsIds
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function removeGroup(workspace, board, groupId) {
    return async dispatch => {
        try {
            const newWorkspace = groupService.removeGroup(workspace, board, groupId)
            await workspaceService.save(newWorkspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace
            })
        } catch (err) {
            console.log('Cannot REMOVE group', err)
        }
    }
}