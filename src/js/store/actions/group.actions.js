import { groupService } from "../../services/group.service";


export function onEditGroup(groupToSave) {
    console.log(`groupToSave`, groupToSave)
    return (dispatch) => {
        groupService.save(groupToSave)
            .then(savedgroup => {
                console.log('Updated group:', savedgroup);
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