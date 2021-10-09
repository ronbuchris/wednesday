import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

import user from '../../../assets/img/user.svg';
import { StatusMenu } from '../menus/StatusMenu';
import { PersonMenu } from '../menus/PersonMenu';
import { DatePicker } from '../menus/DatePicker';

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
  const [isFocus, setFocus] = useState(false);

  const findIdx = (type) => {
    const idx = board.cmpsOrder.findIndex((column) => column === type);
    return idx;
  };

  const printDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth();
    const day = date.getDate();
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${months[month]} ${day < 10 ? '0' + day : day}`;
  };

  const onBlur = (newTxt, prevTxt) => {
    if (newTxt === prevTxt) return;
    item.columns[findIdx('number')].number = newTxt;
    const newItem = { ...item };
    onEditItem(newItem, group);
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
                toggleMenus={toggleMenus}
                onEditItem={onEditItem}
                toggleMenu={toggleMenu}
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
            onClick={(ev) => {
              ev.preventDefault();
              toggleMenu(toggleMenus, 'personMenu', item.id);
            }}
            className="item-column member-col flex cell-cmp btn"
            style={{
              minWidth: board.columns[findIdx('member')].width,
            }}
          >
            <div className="add-member auto-center">
              <FaPlus className="plus" />
            </div>
            {!column.members.length && (
              <img
                className="profile-icon"
                src={user}
                alt="member-placeholder"
              />
            )}
            {column.members &&
              column.members.map((member) => {
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
              {toggleMenus.personMenu === item.id && (
                <PersonMenu
                  toggleMenus={toggleMenus}
                  toggleMenu={toggleMenu}
                  workspace={workspace}
                  findIdx={findIdx}
                  group={group}
                  item={item}
                />
              )}
            </div>
          </div>
        );

      case 'date':
        return (
          <div
            className="date cell-cmp"
            onClick={(ev) => {
              ev.stopPropagation();
              toggleMenu(toggleMenus, 'dateMenu', item.id);
            }}
          >
            <div className="date-border">
              <div
                className="item-column date-col flex auto-center"
                style={{
                  minWidth: board.columns[findIdx('date')].width - 10,
                }}
              >
                {column.date && Date.now() - column.date > 0 && (
                  <span className="red">!</span>
                )}
                {column.date && printDate(column.date)}
                {column.date && (
                  <div
                    className="clear-date auto-center btn"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      column.date = '';
                      onEditItem(item, group);
                    }}
                  >
                    <IoIosCloseCircle />
                  </div>
                )}
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

      case 'number':
        return (
          <div
            className="item-col number-col cell-cmp"
            style={{ minWidth: board.columns[findIdx('number')].width }}
          >
            <div
              className={`number-field flex auto-center ${
                isFocus ? 'focus' : ''
              }`}
              contentEditable="true"
              suppressContentEditableWarning={true}
              spellCheck={false}
              onBlur={(ev) => {
                ev.stopPropagation();
                const value = +ev.target.innerText;
                if (!isNaN(value)) {
                  onBlur(value, column.number);
                } else {
                  ev.target.innerText = '';
                }
                setFocus(false);
              }}
              onClick={(ev) => {
                ev.stopPropagation();
                setFocus(true);
              }}
            >
              {typeof column.number === 'number' && (
                <span className="unit">
                  {board.columns[findIdx('number')].unit}
                </span>
              )}
              {column.number.toLocaleString()}
              {/* {typeof column.number === 'number' && ( */}
              <div
                className="clear-number auto-center btn"
                onClick={(ev) => {
                  ev.stopPropagation();
                  column.number = '';
                  onEditItem(item, group);
                }}
              >
                <IoIosCloseCircle />
              </div>
              {/* )} */}
            </div>
          </div>
        );
      default:
    }
  };
  return <>{renderSwitch(column)}</>;
}
