import { makeId } from '../services/util.service'


import { storageService } from "./async-storage.service"
import { createGroup } from './group.service'
import { createColumn } from './column.service'

export const boardService = { getById, save, getBoardById, remove, toggleMenu, dragAndDrop }
const STORAGE_KEY = 'workspaceDB'

function getById(workspace, boardId) {
    return workspace.boards.find(board => board._id === boardId)
}
//without access to workspace
async function getBoardById(boardId) {
    const workspaces = await storageService.query(STORAGE_KEY)
    const workspace = workspaces.find(workspace => {
        return workspace.boards.find(board => board._id === boardId)
    })
    const board = workspace.boards.find(board => board._id === boardId)
    return board

}

function save(workspace, boardOrTitle, user, users) {

    if (typeof boardOrTitle === 'string') {
        const newBoard = createBoard(user, users, boardOrTitle)
        workspace.boards.push(newBoard)
    } else {
        const boardIdx = workspace.boards.findIndex(currBoard => currBoard._id === boardOrTitle._id);
        workspace.boards.splice(boardIdx, 1, boardOrTitle);
    }
    const newWorkspace = { ...workspace };
    return newWorkspace
}

function remove(workspace, boardId) {
    const boardIdx = workspace.boards.findIndex(board => board._id === boardId);
    workspace.boards.splice(boardIdx, 1)
    const returnedWorkspace = { ...workspace }
    return returnedWorkspace
}

export function createBoard(user, users, title) {
    const groups = [];
    for (let i = 0; i < 3; i++) {
        const group = createGroup(user, i + 1)
        groups.push(group)
    }
    return {
        _id: makeId(),
        title,
        createdAt: Date.now(),
        description: "Click to add description",
        createdBy: {
            _id: user._id,
            fullname: user.fullname,
            img: user.img,
        },
        columns: [
            {
                id: makeId(),
                type: "member",
                title: "Person",
                pos: 1,
                width: 140,
                members: []
            },
            createColumn('status'),
            ,
            {
                id: makeId(),
                type: "date",
                title: "Date",
                width: 140,
                date: ''
            },

        ],
        groups: groups,
        activities: [],
        cmpsOrder: ["member", "status", "date"]
    }
}

function toggleMenu(toggleMenus, menuToOpen, id) {
    for (let menu of Object.keys(toggleMenus)) {
        toggleMenus[menu] = false
    }
    if (menuToOpen) {
        toggleMenus[menuToOpen] = id
    }
    const newMenu = { ...toggleMenus }
    return newMenu
}

function dragAndDrop(workspace, board, result, groupId) {
    const startIdx = result.source.index
    const endIdx = result.destination ? result.destination.index : 0
    if (result.type === "group") {
        const [group] = board.groups.splice(startIdx, 1)
        board.groups.splice(endIdx, 0, group)
    }

    if (result.type === "label") {
        const columnIdx = board.columns.findIndex((column) => column.type === 'status');
        const [label] = board.columns[columnIdx].labels.splice(startIdx, 1)
        board.columns[columnIdx].labels.splice(endIdx, 0, label)
    }

    if (result.type === "item") {
        const destination = result.destination ? result.destination.droppableId : groupId
        const fromGroup = board.groups.find(group => group.id === result.source.droppableId)
        const toGroup = board.groups.find(group => group.id === destination)
        const [item] = fromGroup.items.splice(startIdx, 1)
        toGroup.items.splice(endIdx, 0, item)
    }

    if (result.type === "column") {
        const [column] = board.columns.splice(startIdx, 1)
        board.groups.forEach((group) => {
            group.items.forEach(item => {
                const [column] = item.columns.splice(startIdx, 1)
                item.columns.splice(endIdx, 0, column)
            })
        })
        board.columns.splice(endIdx, 0, column)
        const [cmpOrder] = board.cmpsOrder.splice(startIdx, 1)
        board.cmpsOrder.splice(endIdx, 0, cmpOrder)
    }
    const boardIdx = workspace.boards.findIndex(gBoard => gBoard._id === board._id)
    workspace.boards.splice(boardIdx, 1, board)
    const newBoard = workspace.boards.find(gBoard => gBoard._id === board._id)
    // const newBoard = { ...board }
    const newWorkspace = { ...workspace };
    return [newWorkspace, newBoard];
}
