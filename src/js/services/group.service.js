import { storageService } from './async-storage.service'

const STORAGE_KEY = 'workspaceDB';

export const groupService = {
     save
     }

async function save(newGroup) {
    const groupId=newGroup.id;
    const workspaces= await storageService.query(STORAGE_KEY)
    workspaces.forEach(workspace =>{
        workspace.boards.forEach((board) =>{
            board.groups.forEach((group,idx) =>{
                if(group.id===groupId){
                    board.groups.splice(idx,1,newGroup)
                    storageService.put(STORAGE_KEY, workspace)
                }
            })
        })
    })
}