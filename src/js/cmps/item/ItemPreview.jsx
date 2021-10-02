import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import AddUpdate from 'monday-ui-react-core/dist/icons/AddUpdate';
import { FaCaretDown } from 'react-icons/fa';

import { toggleMenu } from '../../store/actions/board.actions';
import { loadItem } from '../../store/actions/item.actions';

import { ItemColumn } from './ItemColumn';
import { connect } from 'react-redux';
import { ItemMenu } from '../menus/ItemMenu';

function _ItemPreview({
  onRemoveItem,
  toggleMenus,
  onEditItem,
  toggleMenu,
  onAddItem,
  loadItem,
  provided,
  onBlur,
  board,
  group,
  item,
  workspace,
  history,
  location,
}) {
  return (
    <div className="item-preview flex">
      {toggleMenus.itemMenu === item.id && (
        <ItemMenu
          onAddItem={onAddItem}
          group={group}
          onRemoveItem={onRemoveItem}
          toggleMenus={toggleMenus}
          toggleMenu={toggleMenu}
          item={item}
        />
      )}
      <div className="item-menu-arrow flex align-center justify-center">
        <div
          className="item-menu-button br4 btn flex align-center justify-center"
          onClick={() => {
            toggleMenu(toggleMenus, 'itemMenu', item.id);
          }}
        >
          <FaCaretDown />
        </div>
      </div>
      <div
        className="indicator"
        style={{ backgroundColor: group.style.color }}
      ></div>
      <div
        {...provided.dragHandleProps}
        className="item-title flex space-between cell-cmp"
      >
        <div className="title flex align-center">
          <div
            className="item-title-text"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(ev) => {
              onBlur(ev.target.innerText, item.title, item, 'item', group);
            }}
          >
            {item.title}
          </div>
          <div className="edit-title-btn br4">Edit</div>
        </div>
        <div
          className="add-update-btn-wrapper flex align-center"
          onClick={() =>
            // console.log(`this.props.history`, history)
            history.push(location.pathname + `/item/${item.id}`)
          }
        >
          <AddUpdate className="add-update-btn" />
        </div>
      </div>
      <div className="item-column-list flex">
        {item.columns.map((column, idx) => {
          return (
            <ItemColumn
              workspace={workspace}
              toggleMenus={toggleMenus}
              onEditItem={onEditItem}
              toggleMenu={toggleMenu}
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
  };
}

const mapDispatchToProps = {
  toggleMenu,
  loadItem,
};

export const ItemPreview = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_ItemPreview)
);
