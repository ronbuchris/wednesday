const initialState = {
    group: null,
    groups:[]
}

export function groupReducer(state = initialState, action) {
    var newState = state
    var groups
    switch (action.type) {
        case 'SET_GROUP':
            newState = { ...state, group: action.group }
            break
        case 'SET_GROUPS':
            if(action.groupsIds) {
                groups = state.groups.forEach(group => {
                    return action.groupsIds.map(groupId => {
                        if(group.id === groupId) {
                        console.log('fsdf',group);           
                            return group
                    } 
                })})
                console.log('groups returns', groups);
                newState = { ...state, groups }
                break
            }
            newState = { ...state, groups: action.groups }
            break
        case 'ADD_GROUP':
            newState = { ...state, groups:[...state.groups, action.group] }
            break
        default:
    }
    return newState
}