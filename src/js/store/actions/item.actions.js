import { boardService } from "../../services/board.service";
import { groupService } from "../../services/group.service";
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

export function onPost(update,user, item, workspace) {
    return async dispatch => {
        try {
            const workspaceToSave = await itemService.onPost(update, user, item, workspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: workspaceToSave
            })  
        }catch (err) {
            console.log('Cannot add update', err)

        }

    }
}

export function onSetSearch(board, searchBy) {
    return async (dispatch) => {
        // const groups = groupService.query(board, {searchBy})
        try {
            dispatch({
                type: 'SET_SEARCH',
                board,
                searchBy
            })
        } catch (err) {
            console.log('Cannot search item', err)
        }
    }
}

export function loadItem(boardId, itemId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getBoardById(boardId)
            const item = await itemService.getById(board, itemId)
             dispatch({
                 type: 'SET_ITEM',
                 item
             })
        } catch (err) {
            console.log('Cannot load item', err)
        }
    }
}

export function onEditItem(itemToSave, groupId = null, workspace) {
    return async (dispatch) => {
        try {
            const saveditem = await itemService.save(itemToSave, groupId, workspace)
            dispatch({
                type: 'UPDATE_ITEM',
                item: saveditem
            })
        }
        catch (err) {
            console.log('Cannot update item')
            console.log('Cannot save item', err)
        }
    }
}

export function onSortItemTitle(board, sortType) {
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

export function onRemoveItem(workspace, group, itemId) {
    return async (dispatch) => {
        try {
            await itemService.remove(workspace, group, itemId)
            console.log('Deleted Succesfully!');
            dispatch({
                type: 'REMOVE_ITEM',
                itemId
            })
        } catch (err) {
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
