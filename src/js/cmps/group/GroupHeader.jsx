// import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';
import React from "react";
import { render } from "@testing-library/react";
import { FaCaretDown } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import Delete from 'monday-ui-react-core/dist/icons/Delete';


export class GroupHeader extends React.Component {
  state = {
    isHover: false,
    isOpen: false,
  }

  onHover = (bool) => {
    this.setState({ isHover: bool })
  }
  onOpenGroupMenu = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
    console.log(`this.state.isOpen`, isOpen)
  }

  render() {
    const { board, group, onBlur, onRemoveGroup } = this.props
    const { isHover, isOpen } = this.state
    return (
      <div className="group-header flex">
        <div className="group-menu">
          <div className="group-menu-button btn " style={isHover ? { color: group.style.color } : { backgroundColor: group.style.color }} onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)} onClick={() => this.onOpenGroupMenu()}>
            <FaCaretDown />
          </div>
        </div>
        {isOpen && <div className="group-menu-modal">
          <div className="btn">Collapse this group</div>
          <div className="btn">Collapse all Groups</div>
          <div className="btn">Select all items</div>
          <div className="btn">Add group</div>
          <div className="btn">Duplicate this group <FaAngleRight/></div>
          <div className="btn">Move group to board <FaAngleRight/></div>
          <div className="btn">Rename group</div>
          <div className="btn">Change group color</div>
          <div className="btn" onClick={(ev) => {
            ev.stopPropagation();
            onRemoveGroup(group.id)
          }}><Delete />Delete</div>
          <div className="btn">Archive</div>
        </div>
        }
        <div
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
        <div className="group-column-list flex">
          {board.columns.map((column) => {

            return (
              <div
                className="group-column-header"
                key={column.id}
                style={{ minWidth: column.width }}
              >
                {column.title}
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}
