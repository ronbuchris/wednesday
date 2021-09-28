import { storageService } from './async-storage.service';
import { groupService } from './group.service';
const STORAGE_KEY = 'workspaceDB'

export const workspaceService = { query, getById, remove, save, getByBoardId, addItem, editGroup }

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
        console.log(`workspace from save`, workspace._id)
        return storageService.put(STORAGE_KEY, workspace)
    } else {
        // workspace.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, workspace)
    }
}

async function addItem(newItem, workspace, group, board, addToTop) {
    const newWorkspace = { ...workspace };
    const newGroup = {
        ...group,
        items: addToTop ? [newItem, ...group.items] : [...group.items, newItem],
    };
    const groupIdx = board.groups.findIndex(
        (group) => group.id === newGroup.id
    );
    board.groups.splice(groupIdx, 1, newGroup);
    const boardIdx = workspace.boards.findIndex(
        (findBoard) => findBoard._id === board._id
    );
    newWorkspace.boards.splice(boardIdx, 1, board);
    const saveWorkspace = await save(newWorkspace)
    return Promise.resolve(saveWorkspace)
}


//EDIT-ADD GROUP
async function editGroup(workspace, board, group, user) {
    const newWorkspace = { ...workspace };
    if (group.id) {
        const groupIdx = board.groups.findIndex(oldGroup => oldGroup.id === group.id);
        const boardIdx = await getBoardIdx(workspace.boards, board._id)
        board.groups.splice(groupIdx, 1, group);
        newWorkspace.boards.splice(boardIdx, 1, board);
    } else {
        const newGroup = await groupService.createGroup(user)
        const newBoard = { ...board, groups: [newGroup, ...board.groups] };
        const boardIdx = await getBoardIdx(workspace.boards, newBoard._id)
        newWorkspace.boards.splice(boardIdx, 1, newBoard);
    }
    const saveWorkspace = await save(newWorkspace)
    return Promise.resolve(saveWorkspace)
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