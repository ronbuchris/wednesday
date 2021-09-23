export const boardService = { getById }

function getById(workspace, boardId) {
    return workspace.boards.find(board => board._id === boardId)
    
}