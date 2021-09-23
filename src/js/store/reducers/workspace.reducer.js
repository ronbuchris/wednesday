const initialState = {
    workspace: null,
    workspaces: [],
    labels: [],
}

export function workspaceReducer(state = initialState, action) {
    var newState = state
    var workspaces
    switch (action.type) {
        case 'SET_WORKSPACES':
            newState = { ...state, workspaces: action.workspaces,workspace:action.workspaces[0] }
            break
        case 'SET_WORKSPACE':
            newState = { ...state, workspace: action.workspace }
            break
        case 'ADD_WORKSPACE':
            newState = { ...state, workspaces: [...state.workspaces, action.workspace] }
            break
        case 'EDIT_WORKSPACE':
            console.log(`action.workspace`, action.workspace)
            workspaces = state.workspaces.map(workspace => (workspace._id === action.workspace._id) ? action.workspace : workspace)
            newState = { ...state, workspaces }
            break
        case 'REMOVE_WORKSPACE':
            const lastRemovedWorkspace = state.workspaces.find(workspace => workspace._id === action.workspaceId)
            workspaces = state.workspaces.filter(workspace => workspace._id !== action.workspaceId)
            newState = { ...state, workspaces, lastRemovedWorkspace }
            break
        default:
    }
    return newState
}