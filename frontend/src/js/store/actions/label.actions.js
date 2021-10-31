import { labelService } from "../../services/label.service";
import { workspaceService } from "../../services/workspace.service";

export function saveLabel(workspace, board, columnIdx, label, labelIdx, prevColor, type) {
    return async dispatch => {
        try {
            const newWorkspace = labelService.save(workspace, board, columnIdx, label, labelIdx, prevColor, type);
            await workspaceService.save(newWorkspace);
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace,
            })
        } catch (err) {
            console.log('Cannot add label', err)
        }
    }
}

export function removeLabel(labelIdx, board, columnIdx, workspace) {
    return async dispatch => {
        try {
            const newWorkspace = labelService.remove(labelIdx, board, columnIdx, workspace);
            await workspaceService.save(newWorkspace);
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace,
            })
        } catch (err) {
            console.log('Cannot remove label', err)
        }
    }
}