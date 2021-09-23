import { WorkspaceNav } from './WorkspaceNav';
import Workspace from 'monday-ui-react-core/dist/icons/Workspace';
import Notifications from 'monday-ui-react-core/dist/icons/Notifications';
import Inbox from 'monday-ui-react-core/dist/icons/Inbox';
import MyWeek from 'monday-ui-react-core/dist/icons/MyWeek';
import Invite from 'monday-ui-react-core/dist/icons/Invite';
import Help from 'monday-ui-react-core/dist/icons/Help';
// import { Button } from 'monday-ui-react-core';

export function SidebarHeader() {
  return (
    <div className="sidebar-container">
      <nav className="sidebar-icons">
        <Workspace />
        <Notifications />
        <Inbox />
        <MyWeek />
        <Invite />
        <Help />
      </nav>
      <WorkspaceNav />
    </div>
  );
}
