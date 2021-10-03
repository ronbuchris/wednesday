const workspaceService = require('./workspace.service.js');
const logger = require('../../services/logger.service')
module.exports = {
    getWorkspaces
}

async function getWorkspaces(req, res) {
    try {
        var queryParams = req.query;
        const workspaces = await workspaceService.query(queryParams)
        res.json(workspaces);
    } catch (err) {
        logger.error('Failed to get workspaces', err)
        res.status(500).send({ err: 'Failed to get workspaces' })
    }
}