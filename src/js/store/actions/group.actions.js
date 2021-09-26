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
            .then(savedgroup => {
                dispatch({
                    type: 'UPDATE_GROUP',
                    group: savedgroup
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
            dispatch({
                type: 'SET_GROUPS',
                groups: board.groups
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