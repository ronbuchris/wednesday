import { storageService } from './async-storage.service'

const STORAGE_KEY = 'workspaceDB';

export const itemService = {
     save
     }

async function save(newItem) {
    const itemId=newItem.id;
    const workspaces= await storageService.query(STORAGE_KEY)
    workspaces.forEach(workspace =>{
        workspace.boards.forEach((board) =>{
            board.groups.forEach((group) =>{
                group.items.forEach((item,idx) =>{
                    if(item.id===itemId){
                        group.items.splice(idx,1,newItem)
                        storageService.put(STORAGE_KEY, workspace)
                    }
                })
            })
        })
    })
}