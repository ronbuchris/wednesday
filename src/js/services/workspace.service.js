import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { socketService } from './socket.service'
import { makeId } from '../services/util.service'
const STORAGE_KEY = 'workspaceDB'

export const workspaceService = { query, getById, remove, save, getByBoardId, addNewWorkspace }

async function query(user) {
    console.log(user);
       return await httpService.get(`workspace`,user)

}



function getById(workspaceId) {
    return httpService.get(`workspace/${workspaceId}`)
    // return storageService.get(STORAGE_KEY, workspaceId)
}

function remove(workspaceId) {
    return httpService.delete(`workspace/${workspaceId}`)
    // return storageService.remove(STORAGE_KEY, workspaceId)
}

async function save(workspace) {
    let updatedWorkspace;
    if (workspace._id) {

        updatedWorkspace = await httpService.put(`workspace/${workspace._id}`, workspace)
        // return storageService.put(STORAGE_KEY, workspace)
    } else {
        updatedWorkspace = await httpService.post(`workspace`, workspace)
        // workspace.owner = userService.getLoggedinUser()
        // return storageService.post(STORAGE_KEY, workspace)
    }
    socketService.emit('board changed', updatedWorkspace)
    return updatedWorkspace;
}

function getByBoardId(boardId, workspaces) {
    return workspaces.find(workspace => {
        return workspace.boards.find(board => {
            if (board._id === boardId) {
                return workspace
            }
        })
    })
}

async function addNewWorkspace(user, title) {
    const workspace = createWorkspace(user, title)
    await storageService.post(STORAGE_KEY, workspace)
    user.workspaces.push(workspace._id)
    const userToSave = { ...user }
    return [userToSave, workspace]
}


function createWorkspace(user, title) {
    return {
        _id: makeId(),
        name: title,
        description: "desc-workspace",
        createdAt: Date.now(),
        createdBy: {
            _id: user._id,
            fullname: user.fullname
        },
        members: [],
        boards: []
    }
}
