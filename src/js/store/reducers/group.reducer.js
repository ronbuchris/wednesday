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
            if(action.groupsIds.length) {
                groups = action.board.groups.filter(group => {
                    return action.groupsIds.includes(group.id)
                })
                newState = { ...state.groups, groups:[...groups] }
                break
            }
            if(action.sortType) {
                groups = action.board.groups.map(group => {
                    if (action.sortType === 'A-Z') {
                        return group.items.sort((a,b) => {
                            return a.title.localeCompare(b.title)
                        })
                    } else {
                        return group.items.sort((a, b) => b.title.localeCompare(a.title))
                    }
                })
                newState = { ...state.groups, groups: [...action.board.groups] }
                break
            }
            newState = { ...state, groups: action.board.groups }
            break
        case 'ADD_GROUP':
            newState = { ...state, groups:[...state.groups, action.group] }
            break
        default:
    }
    return newState
}