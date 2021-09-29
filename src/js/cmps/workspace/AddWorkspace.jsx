import React from 'react';

export class AddWorkspace extends React.Component {
  state = {
    title: '',
  };

  handleChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    if (!field) return;
    const value = ev.target.value;
    this.setState((prevState) => ({
      ...prevState.update, [field]: value 
    }));
  };

  onCreateWorkspace = (ev) => {
    ev.preventDefault();

  };

  render() {
    const { title } = this.state;
    const { toggleMenus,toggleMenu} = this.props;
    return (
      <div className="add-workspace-modal br8">
          <div className="close-add-workspace-modal btn" onClick={()=>{
                toggleMenu(toggleMenus)
            }}>X</div>
        <div className="create-workspace-title">Create Workspace</div>
        <div className="workspace-icon">ICON</div>
        <div className="add-workspace-input-wrapper">
          <div className="workspace-new-title-name">Workspace name</div>
          <div className="workspace-title-input">
            <form className="title-input" onSubmit={this.onCreateWorkspace}>
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
            <button className="cancel-workspace-btn" onClick={()=>{
                toggleMenu(toggleMenus)
            }}>Cancel</button>
          </div>
          <div className="create-btn">
            <button className="create-workspace-btn" onClick={(ev)=>{
                this.onCreateWorkspace(ev);
                toggleMenu(toggleMenus);
            }}>Create Workspace</button>
          </div>
        </div>
      </div>
    );
  }
}
