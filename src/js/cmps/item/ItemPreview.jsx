import React from 'react';
import { Link } from 'react-router-dom';

import AddUpdate from 'monday-ui-react-core/dist/icons/AddUpdate';
import { FaCaretDown } from 'react-icons/fa';

import { toggleMenu } from '../../store/actions/board.actions';
import { loadItem } from '../../store/actions/item.actions';

import { ItemColumn } from './ItemColumn';
import { connect } from 'react-redux';
import { ItemMenu } from '../menus/ItemMenu';
import { Screen } from '../../pages/Screen';

function _ItemPreview({
  item,
  onBlur,
  group,
  board,
  onRemoveItem,
  toggleMenus,
  toggleMenu,
  loadItem,
  provided,
  

}) {
  return (
    <div className="item-preview flex">
      {toggleMenus.itemMenu === item.id && (
        <ItemMenu
          item={item}
          onRemoveItem={onRemoveItem}
          toggleMenus={toggleMenus}
          toggleMenu={toggleMenu}
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
        // contentEditable="true"
        // suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, item.title, item, 'item', group);
        }}
      >
        <div className="item-title-text">{item.title}</div>
        <AddUpdate
          onClick={() => {
            loadItem(board._id, item.id);
          }}
        />
      </div>
      <div className="item-column-list flex">
        {item.columns.map((column, idx) => {
          return (
            <ItemColumn
              key={idx}
              board={board}
              column={column}
              item={item}
              toggleMenus={toggleMenus}
              toggleMenu={toggleMenu}
            />
          );
        })}
      </div>
      <div className="indicator"></div>
      {toggleMenus.itemMenu && <Screen toggleMenus={toggleMenus} />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    toggleMenus: state.workspaceModule.toggleMenus,
  };
}

const mapDispatchToProps = {
  toggleMenu,
  loadItem,
};

export const ItemPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ItemPreview);
