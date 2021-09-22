import { storageService } from "./async-storage.service"


export const boardService = { getById }

function getById(boardId, workspaces) {
    console.log(workspaces);
    const board = workspaces.forEach(workspace =>workspace.boards.find(board => board.id === boardId))
    return board
}