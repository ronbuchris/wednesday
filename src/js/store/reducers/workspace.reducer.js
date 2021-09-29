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
        isWorkspaceModal:false,
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
        // for (let menu of Object.keys(state.isMenuOpen)) {
        //     state.isMenuOpen[menu] = false
        //     console.log(`state.isMenuOpen`, state.isMenuOpen[menu])
        // }
        // if (action.isMenuOpen) {
        //     state.isMenuOpen[action.isMenuOpen] = true
        //     console.log(`state.isMenuOpen[action.isMenuOpen]`, state.isMenuOpen[action.isMenuOpen])
        // }
        // newState = { ...state, isMenuOpen: {} }
        // console.log(`newState`, newState)
        default:
    }
    return newState
}