export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

const gWorkspaces = [
    {
        "_id": "w101",
        "name": "Workspace-1",
        "description": "desc-workspace",
        "createdAt": 1489983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Adir Cohen",
        },
        "members": [
            {
                "_id": "u102",
                "fullname": "On Chetrit",
            }
        ],
        "boards": [
            {
                "_id": "b101",
                "title": "board-1",
                "createdAt": 1589983468418,
                "description": "desc-board",
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "style": {},
                "columns": [
                    {
                        "id": "column102",
                        "type": "member",
                        "title": "Owner",
                        "pos": 2,
                        "width": 140,
                        "members": [
                            {
                                "id": "user101",
                                "fullname": "On Chetrit",
                                "img": "http://some-img"
                            },
                            {
                                "id": "user102",
                                "fullname": "Adir Cohen",
                                "img": "http://some-img"
                            },
                            {
                                "id": "user103",
                                "fullname": "Ron Buchris",
                                "img": "http://some-img"
                            }
                        ]
                    },
                    {
                        "id": "column101",
                        "type": "status",
                        "title": "status",
                        "pos": 1,
                        "width": 140,
                        "labels": [
                            {
                                "title": "Done",
                                "color": "green"
                            },
                            {
                                "title": "stuck",
                                "color": "red"
                            }
                        ]
                    }

                ],
                "groups": [
                    {

                        "id": "g101",
                        "title": "Group 1",
                        "items": [
                            {
                                "id": "c101",
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
                                        "title": "done",
                                        "bgcolor": "green",

                                    },
                                ],
                                "date": 1589983468418,

                            },
                            {
                                "id": "c102",
                                "title": "Replace logo",
                                "columns": [
                                    {
                                        "type": "member",
                                        "members": []
                                    },
                                    {
                                        "type": "status",
                                        "title": "warning",
                                        "bgcolor": "red",
                                    }
                                ],
                                "date": 1589983468418,

                            },
                        ],
                        "style": {
                            "color": "blue",
                        }
                    },
                    {

                        "id": "g401",
                        "title": "Group 2",
                        "items": [
                            {
                                "id": "c501",
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
                                        "title": "done",
                                        "bgcolor": "green",

                                    },
                                ],
                                "date": 1589983468418,

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
                                        "title": "done",
                                        "bgcolor": "green",

                                    },
                                ],
                                "date": 1589983468418,

                            },
                        ],
                        "style": {
                            "color": "red",
                        }
                    },

                ],
                "activities": [],
                // for monday
                "cmpsOrder": ["status", "member", "date"]
            },
            {
                "_id": "b102",
                "title": "board-2",
                "createdAt": 1589983468418,
                "description": "desc-board",
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Adir Cohen",
                },
                "style": {},
                "columns": [
                    {
                        "id": "column101",
                        "type": "status",
                        "title": "status",
                        "pos": 1,
                        "width": 140,
                        "labels": [
                            {
                                "title": "Done",
                                "color": "green"
                            },
                            {
                                "title": "stuck",
                                "color": "red"
                            }
                        ]
                    },
                    {
                        "id": "column102",
                        "type": "member",
                        "title": "Owner",
                        "pos": 2,
                        "width": 140,
                        "members": [
                            {
                                "id": "user101",
                                "fullname": "On Chetrit",
                                "img": "http://some-img"
                            },
                            {
                                "id": "user102",
                                "fullname": "Adir Cohen",
                                "img": "http://some-img"
                            },
                            {
                                "id": "user103",
                                "fullname": "Ron Buchris",
                                "img": "http://some-img"
                            }
                        ]
                    }
                ],
                "groups": [
                    {

                        "id": "g102",
                        "title": "Group 2",
                        "items": [
                            {
                                "id": "c103",
                                "title": "Replace",
                                "columns": [
                                    {
                                        "type": "member",
                                        "members": []
                                    },
                                    {
                                        "type": "status",
                                        "title": "done",
                                        "bgcolor": "green",
                                    }
                                    ,
                                ],
                                "date": 1589983468418,

                            },
                            {
                                "id": "c104",
                                "title": "Replace",
                                "columns": [
                                    {
                                        "type": "member",
                                        "members": []
                                    },
                                    {
                                        "type": "status",
                                        "title": "done",
                                        "bgcolor": "green",
                                    }
                                ],
                                "date": 1589983468418,

                            },
                        ],
                        "style": {
                            "color": "blue",
                        }
                    },

                ],
                "activities": [],
                // for monday
                "cmpsOrder": ["status", "member", "date"]
            }]
    },
    {
        "_id": "w102",
        "name": "Workspace-2",
        "description": "desc-workspace-2",
        "createdAt": 1489983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Adir Cohen",
        },
        "members": [
            {
                "_id": "u103",
                "fullname": "Ron Buchris",
            }
        ],
        "boards": [
            {
                "_id": "b201",
                "title": "board-3",
                "createdAt": 1589983468418,
                "description": "desc-board-2",
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "style": {},
                // "columns":{
                //     "status":{
                //         "type":"status",
                //         "labels":[
                //             {
                //                 "title":"done",
                //                 "bgcolor":"green"
                //             },
                //             {
                //                 "title":"working on",
                //                 "bgcolor":"yellow"
                //             },
                //             {
                //                 "title":"stuck",
                //                 "bgcolor":"red"
                //             },
                //         ]
                //     },
                //     "owner":{
                //         "type":"people",
                //         "members":[
                //             {
                //                 "id":"f101",
                //                 "fullname":"On Chetrit",
                //                 "img":"http://some-img",
                //             },
                //             {
                //                 "id":"f101",
                //                 "fullname":"Adir Cohen",
                //                 "img":"http://some-img",
                //             },
                //             {
                //                 "id":"f101",
                //                 "fullname":"Ron Buchris",
                //                 "img":"http://some-img",
                //             },
                //         ]
                //     },
                // },
                "groups": [
                    {

                        "id": "g201",
                        "title": "Group 3",
                        "items": [
                            {
                                "id": "c201",
                                "title": "Replace logo",
                                "columns": [
                                    {
                                        "type": "member",
                                        "members": []
                                    },
                                    {
                                        "type": "status",
                                        "title": "done",
                                        "bgcolor": "green",
                                    }
                                ],
                                "date": 1589983468418
                            },
                            {
                                "id": "c202",
                                "title": "Replace logo",
                                "columns": [
                                    {
                                        "type": "member",
                                        "members": []
                                    },
                                    {
                                        "type": "status",
                                        "title": "warning",
                                        "bgcolor": "red",
                                    }
                                ],
                                "date": 1589983468418,

                            },
                        ],
                        "style": {
                            "color": "blue",
                        }
                    },

                ],
                "activities": [],
                // for monday
                "cmpsOrder": ["status", "member", "date"]
            },
            {
                "_id": "b202",
                "title": "board-4",
                "createdAt": 1589983468418,
                "description": "desc-board",
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "style": {},
                "columns": [
                    {
                        "id": "column101",
                        "type": "status",
                        "title": "status",
                        "pos": 1,
                        "width": 140,
                        "labels": [
                            {
                                "title": "Done",
                                "color": "green"
                            },
                            {
                                "title": "stuck",
                                "color": "red"
                            }
                        ]
                    },
                    {
                        "id": "column102",
                        "type": "member",
                        "title": "Owner",
                        "pos": 2,
                        "width": 140,
                        "members": [
                            {
                                "id": "user101",
                                "fullname": "On Chetrit",
                                "img": "http://some-img"
                            },
                            {
                                "id": "user102",
                                "fullname": "Adir Cohen",
                                "img": "http://some-img"
                            },
                            {
                                "id": "user103",
                                "fullname": "Ron Buchris",
                                "img": "http://some-img"
                            }
                        ]
                    }
                ],
                "groups": [
                    {

                        "id": "g302",
                        "title": "Group 4",
                        "items": [
                            {
                                "id": "c303",
                                "title": "Replace",
                                "columns": [
                                    {
                                        "type": "member",
                                        "members": []
                                    },
                                    {
                                        "type": "status",
                                        "title": "done",
                                        "bgcolor": "green",
                                    }
                                ],
                                "date": 1589983468418,

                            },
                            {
                                "id": "c304",
                                "title": "Replace",
                                "columns": [
                                    {
                                        "type": "member",
                                        "members": []
                                    },
                                    {
                                        "type": "status",
                                        "title": "done",
                                        "bgcolor": "green",
                                    }
                                    ,
                                ],
                                "date": 1589983468418,

                            },
                        ],
                        "style": {
                            "color": "blue",
                        }
                    },

                ],
                "activities": [],
                // for monday
                "cmpsOrder": ["status", "member", "date"]
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
_save('workspaceDB', gWorkspaces)
_save('userDB', gUsers)


function query(entityType, delay = 400) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
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