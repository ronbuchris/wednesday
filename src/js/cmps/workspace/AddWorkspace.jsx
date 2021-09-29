import React from "react";

export class AddWorkspace extends React.Component {
    state = {
        title: ''
    }

    handleChange = (ev) => {
        ev.preventDefault();
        const field = ev.target.name;
        if (!field) return;
        const value = ev.target.value;
        this.setState((prevState) => ({
            update: { ...prevState.update, [field]: value },
        }));
    };

    onAddWorkspace = (ev) => {
        ev.preventDefault();


    }

    render() {
        const { title } = this.state
        return (
            <div className="modal-container">
                <div className="add-workspace-modal br8">
                    <div className="create-workspace-title">
                        Create Workspace
                    </div>
                    <div className="workspace-icon">
                        ICON
                    </div>
                    <div className="add-workspace-input-wrapper">
                        <div className="workspace-new-title-name">
                            Workspace name
                        </div>
                        <div className="workspace-title-input">
                            <form className="title-input" onSubmit={this.onAddWorkspace}>
                                <input
                                    name="title"
                                    id="title"
                                    type="text"
                                    placeholder="New Workspace"
                                    value={title}
                                    onChange={this.handleChange}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="new-workspace-container-btn">
                        <div className="cancel-btn">
                            <button className="cancel-workspace-btn">
                                Cancel
                            </button>
                        </div>
                        <div className="create-btn">
                            <button className="create-workspace-btn" onClick={}>
                                Create Workspace
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
