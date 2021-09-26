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
            console.log(action);
            if(action.groupsIds) {
                groups = action.board.groups.filter(group => {
                    console.log(group);
                    return action.groupsIds.includes(group.id)
                })
                console.log('groups returns', groups);
                newState = { ...state.groups, groups:[...groups] }
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