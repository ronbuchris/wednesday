import Home from 'monday-ui-react-core/dist/icons/Home';


export function WorkspaceHeader({ workspace, handleChange }) {
  return (
    <div className="workspace-header">
      <div className="workspace-bgimg"></div>
      <div className="flex align-center justify-center column">
        <h1><Home />{workspace.name}</h1>
      <p>
        Use the main Workspace to manage and collaborate on all company-wide
        boards. All team members are in this Workspace
      </p>
      </div>
      <button onClick={handleChange}>Boards</button>
      <button onClick={handleChange}>Members</button>
    </div>
  );
}
