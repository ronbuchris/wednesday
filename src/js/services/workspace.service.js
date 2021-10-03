import { storageService } from './async-storage.service';
import { makeId } from '../services/util.service'
const STORAGE_KEY = 'workspaceDB'

export const workspaceService = { query, getById, remove, save, getByBoardId, addNewWorkspace }

async function query(user) {
    const workspaces = await storageService.query(STORAGE_KEY)
    if (user._id === 'guest') return Promise.resolve(workspaces)
    const userWorkspaces = workspaces.filter(workspace => workspace.createdBy._id === user._id)
    workspaces.forEach(workspace => {
        workspace.members.forEach(member => {
            if (member._id === user._id) {
                userWorkspaces.push(workspace)
            }
        })
    });
    //   return httpService.get(`workspace`)
    return Promise.resolve(userWorkspaces)
}


function getById(workspaceId) {
    return storageService.get(STORAGE_KEY, workspaceId)
}

function remove(workspaceId) {
    // return httpService.delete(`workspace/${workspaceId}`)
    return storageService.remove(STORAGE_KEY, workspaceId)
}

function save(workspace) {
    if (workspace._id) {
        //   const editWorkspace = await httpService.put(workspace)
        return storageService.put(STORAGE_KEY, workspace)
    } else {
        //   const addedWorkspace = await httpService.post(`workspace`, workspace)
        // workspace.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, workspace)
    }
}

async function getByBoardId(boardId) {
    const workspaces = await storageService.query(STORAGE_KEY)
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
