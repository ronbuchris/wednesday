// import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';
import React from 'react';
import { connect } from 'react-redux';
import {Droppable,Draggable} from 'react-beautiful-dnd'
import { FaCaretDown } from 'react-icons/fa';
import Drag from 'monday-ui-react-core/dist/icons/Drag';
import { toggleMenu } from '../../store/actions/board.actions';
import { Screen } from '../../pages/Screen';
import { GroupMenu } from '../menus/GroupMenu';
import { GroupColumn } from './GroupColumn';

export class _GroupHeader extends React.Component {
  state = {
    isHover: false,
    isColor: false,
  };

  onHover = (bool,groupId) => {
    this.props.setCurrGroupId(groupId)
    this.setState({ isHover: bool });
  };

  colorPicker = () => {
    const { isColor } = this.state;
    this.setState({ isColor: !isColor });
  };

  changeGroupColor = (color) => {
    const { group, onEditGroup } = this.props;
    const newGroup = { ...group, style: { color } };
    onEditGroup(newGroup);
  };

  render() {
    const { board, group, onBlur, onRemoveGroup, toggleMenus, toggleMenu, provided } =
      this.props;
    const { isHover, isColor } = this.state;
    return (
      <div className="group-header flex">
        <div className="group-arrow">
          <div
            className="group-menu-button btn"
            style={
              isHover
                ? { color: group.style.color }
                : toggleMenus.groupMenu === group.id
                  ? { backgroundColor: '#cce5ff', color: '#0073ea' }
                  : { backgroundColor: group.style.color }
            }
            onMouseEnter={() => this.onHover(true)}
            onMouseLeave={() => this.onHover(false)}
            onClick={() => {
              toggleMenu(toggleMenus, 'groupMenu', group.id);
            }}
          >
            <FaCaretDown />
          </div>
        </div>
        {toggleMenus.groupMenu === group.id && (
          <GroupMenu
            toggleMenus={toggleMenus}
            toggleMenu={toggleMenu}
            changeGroupColor={this.changeGroupColor}
            group={group}
            isColor={isColor}
            onRemoveGroup={onRemoveGroup}
            colorPicker={this.colorPicker}
          />
        )}
        <div className="drag-btn btn" {...provided.dragHandleProps}>
          <Drag />
        </div>
        <div
          onMouseEnter={() => this.onHover(true,group.id)}
          onMouseLeave={() => this.onHover(false,group.id)}
          className="group-title flex align-center"
          style={{ color: group.style.color }}
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={(ev) => {
            onBlur(ev.target.innerText, group.title, group, 'group');
          }}
        >
          {group.title}
        </div>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided)=>(
            <div className="group-column-list flex" {...provided.droppableProps} ref={provided.innerRef}>
        {board.columns.map((column,index) => {
          return <GroupColumn index={index} key={column.id} column={column}/>
        })}
        {provided.placeholder}
        </div>
        )}
        </Droppable>
        {toggleMenus.groupMenu && <Screen toggleMenus={toggleMenus} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toggleMenus: state.workspaceModule.toggleMenus,
  };
}

const mapDispatchToProps = { toggleMenu };

export const GroupHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupHeader);
