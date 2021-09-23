import { storageService } from './async-storage.service'

const STORAGE_KEY = 'workspaceDB';

export const groupService = {
     save
     }

async function save(newGroup) {
    const groupId=newGroup.id;
    console.log(`groupId`, groupId)
    const workspaces= await storageService.query(STORAGE_KEY)
    console.log(`workspacesworkspaces`, workspaces)
    // const newWorkspace= workspaces.for(workspace =>{
    //     return workspace.groups.find((group,idx) =>{
    //         if( group.id===groupId){
    //           group.splice(idx,1,newGroup)
    //         }

    //     })
    // })
    workspaces.forEach(workspace =>{
        console.log(`workspace`, workspace)
        workspace.boards.forEach((board) =>{
            console.log(`board`, board)
            board.groups.forEach((group,idx) =>{
                console.log(`group`, group)
                console.log(`idx`, idx)
                if(group.id===groupId){
                    board.groups.splice(idx,1,newGroup)
                    storageService.put(STORAGE_KEY, workspace)
                }
            })
        })
    })
}