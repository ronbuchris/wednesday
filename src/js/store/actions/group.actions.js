
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


export function editGroup(workspace,board,group,user){
    return async(dispatch)=>{
        try{
            const workspaceToSave =  groupService.editGroup(workspace,board,group,user)
            const newBoard = boardService.getById(workspaceToSave,board._id)
            await workspaceService.save(workspaceToSave)
            dispatch({
                type:'EDIT_WORKSPACE', 
                workspace:workspaceToSave,
            })
            dispatch({
                type:'SET_GROUPS',
                groups: newBoard.groups,
            })
        }catch(err){
            console.log('Cannot edit group', err)
        }
    }


}

export function loadGroups(board) {
    return async dispatch => {
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
            const groups = groupService.query(board, { groupsIds})
            dispatch({
                type: 'SET_GROUPS',
                groups
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
                type: 'SET_GROUPS',
                board,
                statuses,
                groupsIds
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function removeGroup(workspace,board,groupId) {
    return async dispatch => {
        try {
            const workspaceToSave = groupService.removeGroup(workspace, board, groupId)
            await workspaceService.save(workspaceToSave)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: workspaceToSave
            })
        } catch (err) {
            console.log('Cannot REMOVE group', err)
        }
    }
}