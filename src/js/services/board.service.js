import { storageService } from "./async-storage.service"


export const boardService = { getById }



function getById(boardId) {
    const workspaces = storageService.query('workspaceDB')
    const board = workspaces.forEach(workspace =>workspace.boards.find(board => board.id === boardId))
    return board
}