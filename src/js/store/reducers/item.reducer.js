const initialState = {
    item: null,
    items:[]
}

export function itemReducer(state = initialState, action) {
    var newState = state
    var items
    switch (action.type) {
        case 'SET_ITEMS':
            newState = { ...state, items: action.items }
            break
        case 'SET_ITEM':
            newState = { ...state, item: action.item }
            break
        case 'ADD_ITEM':
            newState = { ...state, items:[...state.items, action.item] }
            break
        case 'UPDATE_ITEM':
            items = state.items.map(item => (item.id === action.item.id)? action.item : item)
            newState = { ...state, items}
            break
        case 'REMOVE_ITEM':
            const lastRemovedItem = state.items.find(item => item._id === action.itemId)
            items = state.items.filter(item => item._id !== action.itemId)
            console.log(items);
            newState = { ...state, items, lastRemovedItem }
            break
        default:
    }
    return newState
}