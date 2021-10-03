import {useState} from 'react';

import { StatusMenu } from '../menus/StatusMenu';
import { DatePicker } from '../menus/DatePicker';
import {AddMember} from '../menus/AddMember';
import user from '../../../assets/img/user.svg';
import AddSmall from 'monday-ui-react-core/dist/icons/AddSmall';


export function ItemColumn({
  toggleMenus,
  toggleMenu,
  onEditItem,
  column,
  board,
  group,
  item,
  workspace,
}) {

  const [isHover,setIsHover] =useState(false)
  const [isAddMember,addMember] =useState(false)
  const findIdx = (type) => {
    const idx = board.cmpsOrder.findIndex((column) => column === type);
    return idx;
  };

  const renderSwitch = (column) => {
    switch (column.type) {
      case 'status':
        return (
          <div
            className="status fill"
            style={{
              backgroundColor: column.label.color,
              minWidth: board.columns[findIdx('status')].width,
            }}
          >
            <span className="fold"></span>
            <div
              className="item-column status-col flex cell-cmp btn"
              onClick={(ev) => {
                ev.stopPropagation();
                toggleMenu(toggleMenus, 'statusMenu', item.id);
              }}
            >
              {column.label.title}
            </div>
            {toggleMenus.statusMenu === item.id && (
              <StatusMenu
                onEditItem={onEditItem}
                workspace={workspace}
                board={board}
                group={group}
                item={item}
              />
            )}
          </div>
        );

      case 'member':
        return (
          <div
          onClick={(ev) =>{
            ev.preventDefault();
            addMember(!isAddMember)
          }}
          onMouseEnter={setIsHover.bind(this,true)}
          onMouseLeave={setIsHover.bind(this,false)}
            className="item-column member-col flex cell-cmp btn"
            style={{
              minWidth: board.columns[findIdx('member')].width,
            }}
          >
            <div className='add-small'>
            {isHover && <AddSmall/>}
            </div>
            {!column.members.length && <img className="profile-icon" src={user} /> }
            {column.members && column.members.map((member) => {
              return (
                <img
                  key={member._id}
                  src={member.img}
                  className="profile-icon"
                  alt="member-img"
                />
              );
            })}
           <div className="add-member-modal">
             {isAddMember&&<AddMember />}
             </div>
          </div>
        );
      case 'date':
        return (
          <div
            className="date btn cell-cmp"
            onClick={(ev) => {
              ev.stopPropagation();
              toggleMenu(toggleMenus, 'dateMenu', item.id);
            }}
          >
            <div className="date-border">
              <div
                className="item-column date-col flex align-center justify-center btn"
                style={{
                  minWidth: board.columns[findIdx('date')].width - 10,
                }}
              >
                {column.date.substr(4)}
              </div>
            </div>
            {toggleMenus.dateMenu === item.id && (
              <DatePicker
                workspace={workspace}
                toggleMenus={toggleMenus}
                onEditItem={onEditItem}
                toggleMenu={toggleMenu}
                board={board}
                group={group}
                item={item}
              />
            )}
          </div>
        );

      default:
    }
  };

  return <>{renderSwitch(column)}</>;
}
