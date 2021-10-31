const workspaceService = require('./workspace.service.js');
const logger = require('../../services/logger.service')

// GET LIST
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

// GET BY ID 
async function getWorkspaceById(req, res) {
  try {
    const workspaceId = req.params.id;
    const workspace = await workspaceService.getById(workspaceId)
    res.json(workspace)
  } catch (err) {
    logger.error('Failed to get workspace', err)
    res.status(500).send({ err: 'Failed to get workspace' })
  }
}

// POST (add workspace)
async function addWorkspace(req, res) {
  try {
    const workspace = req.body;
    const addedWorkspace = await workspaceService.add(workspace)
    res.json(addedWorkspace)
  } catch (err) {
    logger.error('Failed to add workspace', err)
    res.status(500).send({ err: 'Failed to add workspace' })
  }
}

// PUT (Update workspace)
async function updateWorkspace(req, res) {
  try {
    const workspace = req.body;
    const updatedWorkspace = await workspaceService.update(workspace)
    res.json(updatedWorkspace)
  } catch (err) {
    logger.error('Failed to update workspace', err)
    res.status(500).send({ err: 'Failed to update workspace' })

  }
}

// DELETE (Remove workspace)
async function removeWorkspace(req, res) {
  try {
    const workspaceId = req.params.id;
    const removedId = await workspaceService.remove(workspaceId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove workspace', err)
    res.status(500).send({ err: 'Failed to remove workspace' })
  }
}


module.exports = {
  getWorkspaces,
  getWorkspaceById,
  addWorkspace,
  updateWorkspace,
  removeWorkspace,
}
