const initialState = {
    board: null,
    boards: [],
    currView: 'table',
    sortStore: {
        sortBy: 'Select sort by',
        sortOrder: 'Ascending'
    },
    filterStore: {
        groupsIds: [],
        statuses: [],
        persons: []
    }
}

export function boardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'CHANGE_VIEW':
            newState = { ...state, currView: action.currView }
            break
        case 'FILTER':
            newState = { ...state, filterStore: { ...action.filterStore } }
            break
        case 'SORT':
            newState = { ...state, sortStore: { ...action.sortStore } }
            break

        default:
    }
    return newState
}