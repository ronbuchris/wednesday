import { itemService } from "../../services/item.service";


export function onEditItem(itemToSave) {
    console.log(`itemToSave`, itemToSave)
    return (dispatch) => {
        itemService.save(itemToSave)
            .then(saveditem => {
                console.log('Updated item:', saveditem);
                dispatch({
                    type: 'UPDATE_ITEM',
                    item: saveditem
                })
                console.log('item updated')
            })
            .catch(err => {
                console.log('Cannot update item')
                console.log('Cannot save item', err)
            })
    }
}