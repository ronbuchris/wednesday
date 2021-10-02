const initialState = {
    workspace: null,
    workspaces: [],
    labels: [],
    isOpenNav: false,
    toggleMenus: {
        workspaceMenu: false,
        groupMenu: false,
        boardMenu: false,
        itemMenu: false,
        colorMenu: false,
        dateMenu: false,
        filterMenu: false,
        sortMenu: false,
        isBoardModal: false,
        isWorkspaceModal: false,
        isMemberModal: false
    }
}

export function workspaceReducer(state = initialState, action) {
    var newState = state
    var workspaces
    switch (action.type) {
        case 'SET_WORKSPACES':
            newState = { ...state, workspaces: action.workspaces }
            break
        case 'SET_WORKSPACE':
            newState = { ...state, workspace: action.workspace }
            break
        case 'ADD_WORKSPACE':
            newState = { ...state, workspaces: [...state.workspaces, action.workspace] }
            break
        case 'EDIT_WORKSPACE':
            workspaces = state.workspaces.map(workspace => (workspace._id === action.workspace._id) ? action.workspace : workspace)
            newState = { ...state, workspaces, workspace: action.workspace }
            break
        case 'REMOVE_WORKSPACE':
            const lastRemovedWorkspace = state.workspaces.find(workspace => workspace._id === action.workspaceId)
            workspaces = state.workspaces.filter(workspace => workspace._id !== action.workspaceId)
            newState = { ...state, workspaces, lastRemovedWorkspace }
            break
        case 'TOGGLE_NAV':
            newState = { ...state, isOpenNav: !state.isOpenNav }
            break
        case 'TOGGLE_MENU':
            newState = { ...state, toggleMenus: action.toggleMenus }
            break
        default:
    }
    return newState
}