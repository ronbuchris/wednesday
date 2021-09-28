
import { workspaceService } from "../../services/workspace.service";
import { groupService } from "../../services/group.service";


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
            const newWorkspace = await workspaceService.editGroup(workspace,board,group,user)
            dispatch({
                type:'EDIT_WORKSPACE', 
                workspace:newWorkspace,
            })
        }catch(err){
            console.log('Cannot edit group', err)
        }
    }


}

export function loadGroups(board) {
    return async dispatch => {
        try {
            const statuses = []
            const groupsIds = []
            const groups = await groupService.query(board)
            dispatch({
                type: 'SET_GROUPS',
                board,
                statuses,
                groups,
                groupsIds
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}
export function filterGroups(board, groupsIds, statuses) {
    console.log('ids',groupsIds);
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
    console.log('from actoins',workspace, board, groupId);
    return async dispatch => {
        try {
            const workspaceToSave = await groupService.removeGroup(workspace, board, groupId)
            console.log(workspaceToSave);
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: workspaceToSave
            })
        } catch (err) {
            console.log('Cannot REMOVE group', err)
        }
    }
}