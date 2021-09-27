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
        case 'SET_GROUPS':
            if (action.groupsIds.length) {
                groups = action.board.groups.filter(group => {
                    return action.groupsIds.includes(group.id)
                })
                newState = { ...state.groups, groups: [...groups] }
                break
            }
            if(action.status) {
                console.log(action.status);
                groups = action.board.groups.map(group => {
                       return {
                           ...group, items:group.items.filter(item => {
                               console.log(item);
                               return item.columns[1].label.title === action.status
                           }) 
                       }
                })
            }
            if (action.sortType || action.searchBy) {
                groups = action.board.groups.map(group => {
                    if (action.searchBy) {
                        return {
                            ...group, items: group.items.filter(item => {
                                return item.title.toLowerCase().includes(action.searchBy.itemTitle.toLowerCase())
                            })
                        }
                    } 
                })
                if (action.sortType) {
                    groups = action.board.groups.map(group => {
                            return {
                                ...group, items: group.items.sort((a,b) => {
                                    if (action.sortType === 'A-Z') {
                                        return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                                    } else if (action.sortType === 'Z-A'){
                                        if (a.title.toLowerCase() > b.title.toLowerCase())
                                            return -1;
                                        if (a.title.toLowerCase() < b.title.toLowerCase())
                                            return 1;
                                        return 0;
                                    }
                                })
                            }
                    })
                }
                newState = { ...state.groups, groups: [...groups] }
                break
            }
            newState = { ...state, groups: action.board.groups }
            break
        case 'ADD_GROUP':
            newState = { ...state, groups: [...state.groups, action.group] }
            break
        default:
    }
    return newState
}