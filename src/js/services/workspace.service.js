import { storageService } from './async-storage.service';

const STORAGE_KEY = 'workspaceDB'

// createWorkspaces()

// let workspaces;
export const workspaceService = { query, getById, remove, save }



async function query(user) {
    const workspaces = await storageService.query(STORAGE_KEY)
    const userWorkspaces = workspaces.filter(workspace => workspace.createdBy._id === user._id)
    workspaces.forEach(workspace => {
        workspace.members.forEach(member => {
            if (member._id === user._id) {
                userWorkspaces.push(workspace)
            }
        })
    });
    console.log(`userWorkspaces`, userWorkspaces)
    return Promise.resolve(userWorkspaces)
}

function getById(workspaceId) {
    return storageService.get(STORAGE_KEY, workspaceId)
}
function remove(workspaceId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, workspaceId)
}
function save(workspace) {
    if (workspace._id) {
        return storageService.put(STORAGE_KEY, workspace)
    } else {
        // workspace.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, workspace)
    }
}

// function createWorkspaces() {
//     workspaces = storageService.loadFromStorage(STORAGE_KEY) ? storageService.loadFromStorage(STORAGE_KEY) : gWorkspaces
//     storageService.save(STORAGE_KEY, gWorkspaces)
// }