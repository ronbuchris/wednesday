import { itemService } from "../../services/item.service";


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
