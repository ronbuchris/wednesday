const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
}
async function query(user) {
    try {
        const criteria = {}
        const collection = await dbService.getCollection('workspaceDB')
        const workspaces = await collection.find(criteria).toArray()
        console.log(`workspaces`, workspaces)
        return workspaces
    } catch (err) {
        logger.error('cannot find workspaces', err)
        throw err
    }
}

