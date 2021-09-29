// import DropdownChevronDown from 'monday-ui-react-core/dist/icons/DropdownChevronDown';
import React from "react";
import { render } from "@testing-library/react";
import { FaCaretDown } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import Delete from 'monday-ui-react-core/dist/icons/Delete';
import { ColorPallete } from "../dynamic-cmps/ColorPallete";


export class GroupHeader extends React.Component {
  state = {
    isHover: false,
    isOpen: false,
    isClick: false,
    isColor: false,
  }

  onHover = (bool) => {
    this.setState({ isHover: bool })
  }
  onOpenGroupMenu = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
    this.isClick()
  }
  isClick = () => {
    const { isClick } = this.state
    this.setState({ isClick: !isClick })
  }

  colorPicker = () => {
    const { isColor } = this.state
    this.setState({ isColor: !isColor })
  }

  changeGroupColor=(color) => {
    const {group,onEditGroup}=this.props
    const newGroup={...group, style:{color}};
    onEditGroup(newGroup);
  }
  

  render() {
    const { board, group, onBlur, onRemoveGroup } = this.props
    const { isHover, isOpen, isClick, isColor } = this.state
    return (
      <div className="group-header flex">
        <div className="group-menu">
          <div className="group-menu-button btn" style={isHover ? { color: group.style.color } : isClick ? { backgroundColor: "#cce5ff", color: "#0073ea" } : { backgroundColor: group.style.color }} onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)} onClick={() => this.onOpenGroupMenu()}>
            <FaCaretDown />
          </div>
        </div>
        {isOpen && <div className="group-menu-modal br8">
          <div className="group-menu-section">
            <div className="btn header-btn">Collapse this group</div>
            <div className="btn header-btn">Collapse all Groups</div>
            <div className="btn header-btn">Select all items</div>
          </div>
          <div className="divider"></div>
          <div className="group-menu-section">
            <div className="btn header-btn">Add group</div>
            <div className="btn flex space-between align-center header-btn">Duplicate this group <FaAngleRight /></div>
            <div className="btn flex space-between align-center header-btn">Move group to board <FaAngleRight /></div>
          </div>
          <div className="divider"></div>
          <div className="group-menu-section">
            <div className="btn header-btn">Rename group</div>
            <div className="color-picker">
              <div className="btn header-btn" onClick={this.colorPicker}>
                <div className="change-group-color flex align-center">
                <div className="group-color" style={{backgroundColor:group.style.color}}>
                  </div>
                   Change group color
                   </div>
                </div>
              {isColor && 
              <div className="color-pallete">
                <ColorPallete onOpenGroupMenu={this.onOpenGroupMenu} colorPicker={this.colorPicker} changeGroupColor={this.changeGroupColor}/> 
              </div>}
            </div>
          </div>
          <div className="divider"></div>
          <div className="group-menu-section">
            <div className="btn flex align-center header-btn" onClick={(ev) => {
              ev.stopPropagation();
              onRemoveGroup(group.id)
            }}><Delete />Delete</div>
            <div className="btn header-btn">Archive</div>
          </div>
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
