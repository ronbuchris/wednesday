import { itemService } from "../../services/item.service";


export function loadItems(group) {
    return async dispatch => {
        try {
            dispatch({
                type: 'SET_ITEMS',
                items: group.items
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function onSetSearch(board, searchBy) {
    return async (dispatch) => {
        const groupsIds = []
        try {
            dispatch({
                type: 'SET_GROUPS',
                board,
                searchBy,
                groupsIds
            })
        } catch (err) {
            console.log('Cannot search item', err)
        }
    }
}

export function onEditItem(itemToSave,groupId=null,workspace) {
    console.log(`itemToSave`, itemToSave)
    return async (dispatch) => {
        try{
            const saveditem=await itemService.save(itemToSave,groupId,workspace)
            console.log('Updated item:', saveditem);
            dispatch({
                type: 'UPDATE_ITEM',
                item: saveditem
            })
            console.log('item updated')
        }
             catch(err)  {
                console.log('Cannot update item')
                console.log('Cannot save item', err)
            }
    }
}

export function onSortItemTitle(board, sortType) {
    console.log(sortType);
    return async (dispatch) => {
        const groupsIds = []
        try {
            dispatch({
                type: 'SET_GROUPS',
                board,
                sortType,
                groupsIds
            })
        } catch (err) {
            console.log('Cannot sort item', err)
        }        
    }
}

export function onRemoveItem(workspace,group,itemId) {
    return async (dispatch) => {
        try{
            await itemService.remove(workspace,group,itemId)
            console.log('Deleted Succesfully!');
            dispatch({
                type: 'REMOVE_ITEM',
                itemId
            })
        }catch(err){
            console.log('Cannot remove item', err)
        }
    }
}
