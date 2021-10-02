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
        case 'SET_SEARCH':
            groups = action.board.groups.map(group => {
                if (action.searchBy) {
                    return {
                        ...group, items: group.items.filter(item => {
                            return item.title.toLowerCase().includes(action.searchBy.itemTitle.toLowerCase())
                        })
                    }
                }

            })
            newState = { ...state, groups }
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
        case 'SET_FILTER':
            if (action.groupsIds.length || action.statuses.length) {
                groups = action.board.groups.filter(group => {
                    return action.groupsIds.includes(group.id)
                })
                if (action.statuses.length) {
                    groups = state.groups.map(group => {
                        return {
                            ...group, items: group.items.filter(item => {
                                return action.statuses.includes(item.columns[1].label.title)
                            })
                        }
                    })
                }

                newState = { ...state.groups, groups }
                break
            } else {
                newState = { ...state, groups: action.board.groups }
                break
            }

        case 'SET_GROUPS':
            groups = action.groups.length ? action.groups : action.board.groups
            newState = { ...state, groups: action.groups }
            break
        case 'ADD_GROUP':
            newState = { ...state, groups: [...state.groups, action.group] }
            break
        default:
    }
    return newState
}