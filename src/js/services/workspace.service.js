import { storageService } from './async-storage.service';

// const STORAGE_KEY = 'workspaceDB'

// createWorkspaces()

// let workspaces;
export const workspaceService = { query }



function query() {
    return storageService.query('workspaceDB')
}

// function createWorkspaces() {
//     workspaces = storageService.loadFromStorage(STORAGE_KEY) ? storageService.loadFromStorage(STORAGE_KEY) : gWorkspaces
//     storageService.save(STORAGE_KEY, gWorkspaces)
// }