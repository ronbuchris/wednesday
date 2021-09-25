export function WorkspaceHeader({ workspace }) {
  return (
    <div className="workspace-header">
      <h1>{workspace.title}</h1>
      <p>
        Use the main Workspace to manage and collaborate on all company-wide
        boards. All team members are in this Workspace
      </p>
    </div>
  );
}
