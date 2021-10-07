const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getWorkspaces, getWorkspaceById, addWorkspace, updateWorkspace, removeWorkspace, getLabels, addReview } = require('./workspace.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getWorkspaces)
router.get('/:id', getWorkspaceById)
router.post('/', requireAuth, addWorkspace)
router.put('/:id', updateWorkspace)
// router.put('/:id', requireAuth, updateWorkspace)
router.delete('/:id', requireAuth, removeWorkspace)

module.exports = router