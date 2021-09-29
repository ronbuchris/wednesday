

import { storageService } from "./async-storage.service"
import { createGroup } from './group.service'

export const boardService = { getById, save, getBoardById, remove, toggleMenu }
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
    console.log(typeof boardOrTitle);
    if (typeof boardOrTitle === 'string') {
        const newBoard = createBoard(user, users, boardOrTitle)
        console.log(newBoard);
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
    const members = users.map(user => { return { "_id": user._id, "fullname": user.fullname, "img": user.img } })
    const groups = [];
    for (let i = 0; i < 3; i++) {
        const group = createGroup(user, i + 1)
        groups.push(group)
    }
    return {
        _id: makeId(),
        title: title,
        createdAt: Date.now(),
        description: "Click to add description",
        members,
        createdBy: {
            _id: user._id,
            fullname: user.fullname,
            img: user.img,
        },
        columns: [
            {
                id: makeId(),
                type: "member",
                title: "Owner",
                pos: 1,
                width: 140,
                members
            },
            {
                id: makeId(),
                type: "status",
                title: "Status",
                pos: 2,
                width: 140,
                labels: [
                    {
                        title: "Done",
                        color: "#00c875"
                    },
                    {
                        title: "Stuck",
                        color: "#e2445c"
                    },
                    {
                        title: "Working on it",
                        color: " #fdab3d"
                    }
                ]
            }

        ],
        groups: groups,
        activities: [],
        cmpsOrder: ["status", "member", "date"]
    }
}

function toggleMenu(toggleMenus, menuToOpen, id) {
    for (let menu of Object.keys(toggleMenus)) {
        toggleMenus[menu] = false
    }
    if (menuToOpen) {
        toggleMenus[menuToOpen] = id
        // console.log(`toggleMenus`, toggleMenus)
    }
    const newMenu = { ...toggleMenus }
    return newMenu
}

function makeId(length = 6) {
    var txt = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}