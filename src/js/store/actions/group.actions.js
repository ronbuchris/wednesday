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

export function onEditGroup(groupToSave,board=null) {
    console.log(`groupToSave`, groupToSave)
    return (dispatch) => {
        groupService.save(groupToSave,board)
            .then(workspace => {
                console.log(`workspace`, workspace)
                dispatch({
                    type: 'SET_WORKSPACE',
                      workspace,
                })
                console.log('group updated')
            })
            .catch(err => {
                console.log('Cannot update group')
                console.log('Cannot save group', err)
            })
    }
}

export function loadGroups(board) {
    return async dispatch => {
        try {
            const groupsIds = []
            dispatch({
                type: 'SET_GROUPS',
                board,
                groups: board.groups, 
                groupsIds
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}
export function filterGroups(board,groupsIds) {
    return async dispatch => {
        try {
            dispatch({
                type: 'SET_GROUPS',
                board,
                groupsIds
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}