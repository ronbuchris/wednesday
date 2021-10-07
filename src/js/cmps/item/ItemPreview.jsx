import React, { useState } from 'react';
import { withRouter } from 'react-router';

import AddUpdate from 'monday-ui-react-core/dist/icons/AddUpdate';
import Update from 'monday-ui-react-core/dist/icons/Update';
import { FaCaretDown } from 'react-icons/fa';
import Check from 'monday-ui-react-core/dist/icons/Check';

import { toggleMenu } from '../../store/actions/board.actions';
import { loadItem, toggleSelected } from '../../store/actions/item.actions';

import { ItemColumn } from './ItemColumn';
import { connect } from 'react-redux';
import { ItemMenu } from '../menus/ItemMenu';

function _ItemPreview({
  onRemoveItem,
  toggleMenus,
  onEditItem,
  toggleMenu,
  workspace,
  onAddItem,
  location,
  provided,
  history,
  onBlur,
  board,
  group,
  item,
  toggleSelected,
  selectedItems,
}) {
  const toggleSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      const itemIdx = selectedItems.findIndex((item) => item === itemId);
      selectedItems.splice(itemIdx, 1);
    } else {
      selectedItems.push(itemId);
    }
    toggleSelected(board, selectedItems);
  };

  const [isFocus, setFocus] = useState(false);

  const input = React.createRef();

  return (
    <div className="item-preview flex">
      {toggleMenus.itemMenu === item.id && (
        <ItemMenu
          onRemoveItem={onRemoveItem}
          toggleMenus={toggleMenus}
          toggleMenu={toggleMenu}
          onAddItem={onAddItem}
          board={board}
          group={group}
          item={item}
        />
      )}
      <div className="item-menu-arrow flex auto-center">
        <div
          className="item-menu-button br4 btn flex auto-center"
          onClick={() => {
            toggleMenu(toggleMenus, 'itemMenu', item.id);
          }}
        >
          <FaCaretDown />
        </div>
      </div>
      <div
        className={`indicator select flex auto-center ${
          selectedItems.length && 'is-selecting'
        }`}
        style={{ backgroundColor: group.style.color }}
      >
        <div
          className={`selected btn flex ${
            selectedItems.includes(item.id) ? 'is-selected' : ''
          }`}
          onClick={() => toggleSelect(item.id)}
        >
          {selectedItems.includes(item.id) && (
            <span
              className="flex align-center "
              style={{ color: group.style.color }}
            >
              <Check />
            </span>
          )}
        </div>
      </div>
      <div
        {...provided.dragHandleProps}
        className="item-title flex space-between cell-cmp"
        onClick={() =>
          !isFocus && history.push(location.pathname + `/item/${item.id}`)
        }
      >
        <div className="title flex align-center">
          <div
            className={`item-title-text ${isFocus ? 'focus' : ''}`}
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={input}
            onBlur={(ev) => {
              ev.stopPropagation();
              onBlur(ev.target.innerText, item.title, item, 'item', group);
              setFocus(false);
            }}
            onFocus={(ev) => {
              ev.stopPropagation();
              setFocus(true);
            }}
          >
            {item.title}
          </div>
          <div
            className={`edit-title-btn br4 ${isFocus ? 'focus' : ''}`}
            onClick={(ev) => {
              ev.stopPropagation();
              input.current.focus();
            }}
          >
            Edit
          </div>
        </div>
        <div
          className="add-update-btn-wrapper flex align-center"
          onClick={() => history.push(location.pathname + `/item/${item.id}`)}
        >
          {item.updates.length ? (
            <>
              <Update className="updates" />
              <span className="updates-count">{item.updates.length}</span>
            </>
          ) : (
            <AddUpdate className="add-update-btn" />
          )}
        </div>
      </div>
      <div className="item-column-list flex">
        {item.columns.map((column, idx) => {
          return (
            <ItemColumn
              toggleMenus={toggleMenus}
              toggleMenu={toggleMenu}
              onEditItem={onEditItem}
              workspace={workspace}
              column={column}
              board={board}
              group={group}
              item={item}
              key={idx}
            />
          );
        })}
      </div>
      <div className="space-item"></div>
      <div className="indicator"></div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    toggleMenus: state.workspaceModule.toggleMenus,
    workspace: state.workspaceModule.workspace,
    selectedItems: state.itemModule.selectedItems,
  };
}

const mapDispatchToProps = {
  toggleMenu,
  loadItem,
  toggleSelected,
};

export const ItemPreview = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_ItemPreview)
);
