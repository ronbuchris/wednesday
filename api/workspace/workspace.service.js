const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(user) {
    try {
        if(user.username==='guest'){
            var criteria={}
        }else{
            var criteria = _buildCriteria(user._id)
        }
        const collection = await dbService.getCollection('workspace')
        var workspaces = await collection.find(criteria).toArray()
        return workspaces
    } catch (err) {
        logger.error('cannot find workspaces', err)
        throw err
    }
}

async function getById(workspaceId) {
    try {
        const collection = await dbService.getCollection('workspace')
        const workspace = collection.findOne({ '_id': ObjectId(workspaceId) })
        return workspace
    } catch (err) {
        logger.error(`while finding workspace ${workspaceId}`, err)
        throw err
    }
}

async function remove(workspaceId) {
    try {
        const collection = await dbService.getCollection('workspace')
        await collection.deleteOne({ '_id': ObjectId(workspaceId) })
        return workspaceId
    } catch (err) {
        logger.error(`cannot remove workspace ${workspaceId}`, err)
        throw err
    }
}

async function add(workspace) {
    try {
        const collection = await dbService.getCollection('workspace')
        const addedWorkspace = await collection.insertOne(workspace)
        return addedWorkspace
    } catch (err) {
        logger.error('cannot insert workspace', err)
        throw err
    }
}
async function update(workspace) {
    try {
        var id = ObjectId(workspace._id)
        delete workspace._id
        const collection = await dbService.getCollection('workspace')
        await collection.updateOne({ "_id": id }, { $set: { ...workspace } })
        return workspace
    } catch (err) {
        logger.error(`cannot update workspace ${workspaceId}`, err)
        throw err
    }
}

async function getLabels() {
    const labels = [];
    const numbers = {}
    const criteria = {}
    try {
        const collection = await dbService.getCollection('workspace')
        var workspaces = await collection.find(criteria).toArray()
        workspaces.forEach(workspace => {
            workspace.labels.forEach(label => {
                numbers[label] ? numbers[label]++ : numbers[label] = 1
                if (!labels.includes(label)) {
                    labels.push(label)
                }
            })
        })
        return { numbers, labels }
    } catch (err) {
        logger.error('cannot load labels', err)
        throw err
    }
}

function _buildCriteria(userId) {
    var criteria = {}
    criteria.$or = [
        {
            "createdBy._id" : userId
        },
        {
            "members._id" : userId
        }
    ]
    return criteria;
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    getLabels
}