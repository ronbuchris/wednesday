import { storageService } from './async-storage.service'

const STORAGE_KEY = 'workspaceDB';

export const itemService = {
    save,
    remove
}
async function remove(workspace,group,itemId) {
    console.log(group);
    const itemIdx = group.items.findIndex(item => item.id === itemId);
    console.log(itemIdx);
    group.items.splice(itemIdx,1)
    storageService.put(STORAGE_KEY, workspace)

}

async function save(newItem, groupId, workspace) {
    return workspace.boards.forEach((board) => {
         return board.groups.forEach((group) => {
            if(newItem.id){
                const itemId = newItem.id;
                group.items.forEach((item, idx) => {
                    if (item.id === itemId) {
                        group.items.splice(idx, 1, newItem)
                        storageService.put(STORAGE_KEY, workspace)
                        return newItem;
                    }
                })
            } else if (!newItem.id) {
                if (group.id === groupId) {
                    const addItem = _createItem(newItem)
                    group.items.push(addItem)
                    storageService.put(STORAGE_KEY, workspace)
                    return addItem;
                }
            }
    })

    })
}





function _createItem(newItem) {
    return {
        "id": makeId(),
        "title": newItem,
        "person": [],
        "status": {
            "type": "status",
            "title": "done",
            "bgcolor": "green",
        },
        "date": new Date(),
    }
}





function makeId(length = 6) {
    var txt = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}