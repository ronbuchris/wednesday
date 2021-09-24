export function WorkspaceMenu() {
  return (
    <div className="workspace-menu">
      <div className="list-category">My workspaces</div>
      {workspaces.map((workspace) => {
        return (
          <div key={workspace._id} className="workspace-option">
            {workspace.name}
          </div>
        );
      })}
    </div>
  );
}
