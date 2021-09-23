import {Component} from 'react';
import { WorkspaceNav } from './WorkspaceNav';
import Workspace from 'monday-ui-react-core/dist/icons/Workspace';
import Notifications from 'monday-ui-react-core/dist/icons/Notifications';
import Inbox from 'monday-ui-react-core/dist/icons/Inbox';
import MyWeek from 'monday-ui-react-core/dist/icons/MyWeek';
import Invite from 'monday-ui-react-core/dist/icons/Invite';
import Help from 'monday-ui-react-core/dist/icons/Help';
// import { Button } from 'monday-ui-react-core';

export class SidebarHeader extends Component{
  state={
    isWorkspaceNav:false,
  }
  
  openBoard=()=> {
    const {isWorkspaceNav}=this.state
    this.setState({isWorkspaceNav:!isWorkspaceNav})
  }
  render(){
    const {isWorkspaceNav}=this.state
    return (
      <div className="sidebar-container">
      <nav className="sidebar-icons">
        <p>logo</p>
        <Workspace className="nav-icon workspace" onClick={this.openBoard}/>
        <Notifications className="nav-icon Notifications" />
        <Inbox className="nav-icon Inbox" />
        <MyWeek className="nav-icon MyWeek" />
        <Invite className="nav-icon Invite" />
        <Help className="nav-icon Help" />
      </nav>
     { isWorkspaceNav && <WorkspaceNav />}
    </div>
  );
}
}
