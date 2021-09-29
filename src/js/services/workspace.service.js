import { storageService } from './async-storage.service';
const STORAGE_KEY = 'workspaceDB'

export const workspaceService = { query, getById, remove, save, getByBoardId }

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
    return Promise.resolve(userWorkspaces)
}

function getById(workspaceId) {
    return storageService.get(STORAGE_KEY, workspaceId)
}

function remove(workspaceId) {
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

function getBoardIdx(boards, boardId) {
    return Promise.resolve(
        boards.findIndex(
            (board) => board._id === boardId
        )
    );

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

// function createWorkspaces() {
//     workspaces = storageService.loadFromStorage(STORAGE_KEY) ? storageService.loadFromStorage(STORAGE_KEY) : gWorkspaces
//     storageService.save(STORAGE_KEY, gWorkspaces)
// }