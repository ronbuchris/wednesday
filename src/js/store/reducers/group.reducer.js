const initialState = {
    group: null,
    groups: []
}

export function groupReducer(state = initialState, action) {
    var newState = state
    var groups
    switch (action.type) {
        case 'SET_GROUP':
            newState = { ...state, group: action.group }
            break
        case 'SORT_ITEMS':
            groups = action.board.groups.map(group => {
                return {
                    ...group, items: group.items.sort((a, b) => {
                        if (action.sortType === 'A-Z') {
                            return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                        } else if (action.sortType === 'Z-A') {
                            if (a.title.toLowerCase() > b.title.toLowerCase())
                                return -1;
                            if (a.title.toLowerCase() < b.title.toLowerCase())
                                return 1;
                            return 0;
                        }
                    })
                }
            })
            newState = { ...state.groups, groups: [...groups] }
            break
        case 'SET_GROUPS':
            newState = { ...state, groups: action.groups }
            break
        case 'ADD_GROUP':
            newState = { ...state, groups: [...state.groups, action.group] }
            break
        default:
    }
    return newState
}