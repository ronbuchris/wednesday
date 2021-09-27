import { itemService } from "../../services/item.service";
import {workspaceService} from '../../services/workspace.service'

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

export function addItem(newItemData,user,workspace,group,board,addToTop){
    return async (dispatch) => {
        try{
            const newItem= await itemService.createItem(newItemData,user)
            const newWorkspace=await workspaceService.addItem(newItem,workspace,group,board,addToTop)
            dispatch({
                type:'EDIT_WORKSPACE', 
                workspace:newWorkspace,
            })
              

        }catch(err){
            console.log('Cannot add item', err)
        }
    }
} 
