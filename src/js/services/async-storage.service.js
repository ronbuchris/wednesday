var randomColor = require('randomcolor');


export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    _save
}

const gWorkspaces = [
    {
        _id: "w101",
        name: "Workspace-1",
        description: "desc-workspace",
        createdAt: 1489983468418,
        createdBy: {
            _id: "u101",
            fullname: "Adir Cohen",
            img: `https://robohash.org/adir`,
        },
        members: [
            {
                _id: "u102",
                fullname: "On Chetrit",
                img: `https://robohash.org/on`,
            }
        ],
        boards: [
            {
                _id: "b101",
                title: "Board 1",
                createdAt: 1589983468418,
                description: "desc board",
                createdBy: {
                    _id: "u101",
                    fullname: "Abi Abambi",
                    img: "http://some-img"
                },
                columns: [
                    {
                        id: "column102",
                        type: "member",
                        title: "Person",
                        width: 200,
                        members: []
                    },
                    {
                        id: "column101",
                        type: "status",
                        title: "Status",
                        width: 130,
                        labels: [
                            {
                                id: 'label1',
                                title: "Done",
                                color: "#00c875"
                            },
                            {
                                id: 'label2',
                                title: "Stuck",
                                color: "#e2445c"
                            },
                            {
                                id: 'label3',
                                title: "Working on it",
                                color: "#fdab3d"
                            },
                            {
                                id: 'label4',
                                title: "",
                                color: "#c4c4c4"
                            }
                        ]
                    },
                    {
                        id: "column103",
                        type: "date",
                        title: "Date",
                        width: 170,
                        date: ''
                    },

                ],
                groups: [
                    {

                        id: "g101",
                        title: "Group 1",
                        items: [
                            {
                                id: "c101",
                                title: "Punch adir in the nutz",
                                columns: [
                                    {
                                        type: "member",
                                        members: [
                                            {
                                                _id: "u102",
                                                fullname: "On Chetrit",
                                                img: `https://robohash.org/on`,
                                            }
                                        ]
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label1',
                                            title: "Done",
                                            color: "#00c875"
                                        }

                                    },
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [
                                    {
                                        id: 'update101',
                                        txt: 'first update!',
                                        createBy: {
                                            _id: 'u101',
                                            fullname: 'Adir Cohen',
                                            img: `https://robohash.org/adir`,
                                        },
                                        createAt: 1589983468418
                                    },
                                    {
                                        id: 'update102',
                                        txt: 'Sec update!',
                                        createBy: {
                                            _id: 'u102',
                                            fullname: 'On Chetrit',
                                            img: `https://robohash.org/on`,
                                        },
                                        createAt: 1589989468418
                                    }
                                ],
                                createdAt: 1589983468418,
                                creator: {
                                    _id: "us101",
                                    fullname: "Adir Cohen",
                                    img: `https://robohash.org/adir`
                                },
                                activities: [],
                                isSelected: false,
                            },
                            {
                                id: "c102",
                                title: "This also demo data",
                                columns: [
                                    {
                                        type: "member",
                                        members: [{
                                            _id: 'u101',
                                            fullname: 'Adir Cohen',
                                            img: `https://robohash.org/adir`
                                        }]
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label2',
                                            title: "Stuck",
                                            color: "#e2445c"
                                        }
                                    },
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [],
                                createdAt: 1589983468418,
                                activities: [],
                                isSelected: false,

                            },
                        ],
                        style: {
                            color: randomColor({
                                luminosity: 'dark',
                                format: 'rgba',
                                alpha: 0.9
                            }),
                        }
                    },
                    {

                        id: "g401",
                        title: "Group 2",
                        items: [
                            {
                                id: "c501",
                                title: "Replace logo",
                                columns: [
                                    {
                                        type: "member",
                                        members: [
                                            {
                                                _id: "u101",
                                                fullname: "Adir Cohen",
                                                img: `https://robohash.org/adir`,
                                            }
                                        ]
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label1',
                                            title: "Done",
                                            color: "#00c875"
                                        }

                                    },
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [],
                                createdAt: 1589983468418,
                                activities: [],
                                isSelected: false,

                            },
                            {
                                "id": "c502",
                                "title": "Replace logo",
                                "columns": [
                                    {
                                        "type": "member",
                                        "members": [
                                            {
                                                "_id": "u101",
                                                "fullname": "Adir Cohen",
                                                "img": `https://robohash.org/adir`,
                                            }
                                        ]
                                    },
                                    {
                                        "type": "status",
                                        "label": {
                                            id: 'label2',
                                            title: "Stuck",
                                            color: "#e2445c"
                                        }
                                    },
                                    {
                                        "type": "date",
                                        "date": ''
                                    },
                                ],
                                "updates": [],
                                "createdAt": 1589983468418,
                                "activities": [],
                                "isSelected": false,

                            },
                        ],
                        style: {
                            color: randomColor({
                                luminosity: 'dark',
                                format: 'rgba',
                                alpha: 0.9
                            }),
                        }
                    },

                ],
                activities: [],
                // for monday
                cmpsOrder: ["member", "status", "date"]
            },
            {
                _id: "b102",
                title: "board-2",
                createdAt: 1589983468418,
                description: "desc-board",
                createdBy: {
                    _id: "u101",
                    fullname: "Adir Cohen",
                    img: `https://robohash.org/adir`,
                },
                style: {},
                columns: [
                    {
                        id: "column102",
                        type: "member",
                        title: "Person",
                        width: 140,
                        members: []
                    },
                    {
                        id: "column101",
                        type: "status",
                        title: "Status",
                        width: 140,
                        labels: [
                            {
                                id: 'label5',
                                title: "Done",
                                color: "#00c875"
                            },
                            {
                                id: 'label6',
                                title: "Stuck",
                                color: "#e2445c"
                            },
                            {
                                id: 'label7',
                                title: "Working on it",
                                color: "#fdab3d"
                            },
                            {
                                id: 'label8',
                                title: "",
                                color: "#c4c4c4"
                            }
                        ]
                    },
                    {
                        id: "column103",
                        type: "date",
                        title: "Date",
                        width: 140,
                        date: ''
                    },
                ],
                groups: [
                    {

                        id: "g102",
                        title: "Group 2",
                        items: [
                            {
                                id: "c103",
                                title: "Replace",
                                columns: [
                                    {
                                        type: "member",
                                        members: []
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label5',
                                            title: "Done",
                                            color: "#00c875"
                                        }
                                    },
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [],
                                createdAt: 1589983468418,
                                activities: [],
                                isSelected: false,

                            },
                            {
                                id: "c104",
                                title: "Replace",
                                columns: [
                                    {
                                        type: "member",
                                        members: []
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label8',
                                            title: "",
                                            color: "#c4c4c4"
                                        }
                                    },
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [],
                                createdAt: 1589983468418,
                                activities: [],
                                isSelected: false,

                            },
                        ],
                        style: {
                            color: randomColor({
                                luminosity: 'dark',
                                format: 'rgba',
                                alpha: 0.9
                            }),
                        }
                    },

                ],
                activities: [
                    {
                        id: 'ac101',
                        createdAt: 1589983468418,
                        activity: 'removed item',
                        createdBy: {
                            _id: "u103",
                            fullname: "Ron Buchris",
                            img: "http://some-img"
                        }
                    },
                    {
                        id: 'ac102',
                        createdAt: 1589983468418,
                        activity: 'removed item',
                        createdBy: {
                            _id: "u102",
                            fullname: "On Chetrit",
                            img: "http://some-img"
                        }
                    },
                    {
                        id: 'ac103',
                        createdAt: 1589983468418,
                        activity: 'removed item',
                        createdBy: {
                            _id: "u101",
                            fullname: "Adir Cohen",
                            img: "http://some-img"
                        }
                    },
                ],
                // for monday
                cmpsOrder: ["member", "status", "date"]
            }]
    },
    {
        _id: "w102",
        name: "Workspace-2",
        description: "desc-workspace-2",
        createdAt: 1489983468418,
        createdBy: {
            _id: "u101",
            fullname: "Adir Cohen",
            img: `https://robohash.org/adir`,
        },
        members: [
            {
                _id: "u103",
                fullname: "Ron Buchris",
                img: `https://robohash.org/ron`,
            }
        ],
        boards: [
            {
                _id: "b201",
                title: "board-3",
                createdAt: 1589983468418,
                description: "desc-board-2",
                createdBy: {
                    _id: "u101",
                    fullname: "Abi Abambi",
                    img: "http://some-img"
                },
                style: {},
                columns: [
                    {
                        id: "column102",
                        type: "member",
                        title: "Person",
                        width: 140,
                        members: []
                    },
                    {
                        id: "column101",
                        type: "status",
                        title: "Status",
                        width: 140,
                        labels: [
                            {
                                id: 'label9',
                                title: "Done",
                                color: "#00c875"
                            },
                            {
                                id: 'label10',
                                title: "Stuck",
                                color: "#e2445c"
                            },
                            {
                                id: 'label11',
                                title: "Working on it",
                                color: "#fdab3d"
                            },
                            {
                                id: 'label12',
                                title: "",
                                color: "#c4c4c4"
                            }
                        ]
                    },
                    {
                        id: "column103",
                        type: "date",
                        title: "Date",
                        width: 140,
                        date: ''
                    },

                ],
                groups: [
                    {

                        id: "g201",
                        title: "Group 3",
                        items: [
                            {
                                id: "c201",
                                title: "Replace logo",
                                columns: [
                                    {
                                        type: "member",
                                        members: []
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label10',
                                            title: "Stuck",
                                            color: "#e2445c"
                                        }
                                    },
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [],
                                createdAt: 1589983468418,
                                activities: [],
                                isSelected: false,
                            },
                            {
                                id: "c202",
                                title: "Replace logo",
                                columns: [
                                    {
                                        type: "member",
                                        members: []
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label9',
                                            title: "Done",
                                            color: "#00c875"
                                        }

                                    },
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [],
                                createdAt: 1589983468418,
                                activities: [],
                                isSelected: false,

                            },
                        ],
                        style: {
                            color: randomColor({
                                luminosity: 'dark',
                                format: 'rgba',
                                alpha: 0.9
                            }),
                        }
                    },

                ],
                activities: [],
                // for monday
                cmpsOrder: ["member", "status", "date"]
            },
            {
                _id: "b202",
                title: "board-4",
                createdAt: 1589983468418,
                description: "desc-board",
                createdBy: {
                    _id: "u101",
                    fullname: "Adir Cohen",
                    img: `https://robohash.org/adir`,
                },
                style: {},
                columns: [

                    {
                        id: "column102",
                        type: "member",
                        title: "Person",
                        pos: 2,
                        width: 140,
                        members: []
                    },
                    {
                        id: "column101",
                        type: "status",
                        title: "Status",
                        pos: 1,
                        width: 140,
                        labels: [
                            {
                                id: 'label13',
                                title: "Done",
                                color: "#00c875"
                            },
                            {
                                id: 'label14',
                                title: "Stuck",
                                color: "#e2445c"
                            },
                            {
                                id: 'label15',
                                title: "Working on it",
                                color: "#fdab3d"
                            }
                        ]
                    },
                    {
                        id: "column103",
                        type: "date",
                        title: "Date",
                        width: 140,
                        date: ''
                    },
                ],
                groups: [
                    {

                        id: "g302",
                        title: "Group 4",
                        items: [
                            {
                                id: "c303",
                                title: "Replace",
                                columns: [
                                    {
                                        type: "member",
                                        members: []
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label15',
                                            title: "Working on it",
                                            color: "#fdab3d"
                                        }
                                    },
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [],
                                createdAt: 1589983468418,
                                activities: [],
                                isSelected: false,

                            },
                            {
                                id: "c304",
                                title: "Replace",
                                columns: [
                                    {
                                        type: "member",
                                        members: []
                                    },
                                    {
                                        type: "status",
                                        label: {
                                            id: 'label15',
                                            title: "Working on it",
                                            color: "#fdab3d"
                                        }
                                    }
                                    ,
                                    {
                                        type: "date",
                                        date: ''
                                    },
                                ],
                                updates: [],
                                createdAt: 1589983468418,
                                activities: [],
                                isSelected: false,

                            },
                        ],
                        style: {
                            color: randomColor({
                                luminosity: 'dark',
                                format: 'rgba',
                                alpha: 0.9
                            }),
                        }
                    },

                ],
                activities: [],
                // for monday
                cmpsOrder: ["member", "status", "date"]
            }]
    },
];

const gUsers = [
    {
        _id: 'u101',
        fullname: 'Adir Cohen',
        username: 'KaDaWa',
        password: '123',
        img: `https://robohash.org/adir`,
        workspaces: ['w101', 'w102']

    },
    {
        _id: 'guest',
        fullname: 'guest',
        username: 'guest',
        password: '123',
        img: `https://robohash.org/guest`,
        workspaces: ['w101', 'w102']

    },
    {
        _id: 'u102',
        fullname: 'On Chetrit',
        username: 'on',
        password: '123',
        img: `https://robohash.org/on`,
        workspaces: ['w101']
    },
    {
        _id: 'u103',
        fullname: 'Ron Buchris',
        username: 'ron',
        password: '123',
        img: `https://robohash.org/ron`,
        workspaces: ['w102']
    },
]

// _save('workspaceDB', gWorkspaces)
// _save('userDB', gUsers)


function query(entityType, delay = 400) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}