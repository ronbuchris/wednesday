import { useState } from 'react';
import { connect } from 'react-redux';
import { FiDroplet } from 'react-icons/fi';
import Edit from 'monday-ui-react-core/dist/icons/Edit';
import Drag from 'monday-ui-react-core/dist/icons/Drag';
import CloseSmall from 'monday-ui-react-core/dist/icons/CloseSmall';
import { StatusColorPalette } from './StatusColorPalette';

import { saveLabel, removeLabel } from '../../store/actions/label.actions';
import { toggleMenu } from '../../store/actions/board.actions';

export function _StatusMenu({
  toggleMenus,
  removeLabel,
  onEditItem,
  toggleMenu,
  workspace,
  saveLabel,
  board,
  group,
  item,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [hoverColor, setColor] = useState({ idx: null, color: null });

  const onAddLabel = (columnIdx, color = null) => {
    saveLabel(workspace, board, columnIdx, color);
  };

  const onEditLabel = (columnIdx, value, labelIdx, type, prevTxt) => {
    if (value === prevTxt) return;
    const label = board.columns[columnIdx].labels[labelIdx];
    const prevColor = label.color;
    switch (type) {
      case 'color':
        label.color = value;
        break;
      case 'title':
        label.title = value;
        break;
    }
    saveLabel(workspace, board, columnIdx, label, labelIdx, prevColor);
  };

  const onRemoveLabel = (labelIdx, columnIdx) => {
    removeLabel(labelIdx, board, columnIdx, workspace);
  };

  // const onBlur = (newTxt, pevTxt, label, labelIdx, columnIdx) => {
  //   const currLabel = board.columns[columnIdx].labels[labelIdx];
  //   if (newTxt === pevTxt) return;
  //   const newLabel = { ...label, title: newTxt };
  //   saveLabel(workspace, board, columnIdx);
  // };

  const onChangeStatus = (item, group, column, label) => {
    const columnIdx = item.columns.findIndex(
      (currColumn) => currColumn.type === column.type
    );
    item.columns[columnIdx].label = label;
    const newItem = { ...item };
    onEditItem(newItem, group);
  };

  const statusIdx = () => {
    return board.columns.findIndex((column) => column.type === 'status');
  };

  return (
    <div
      className={`status-menu flex column space-between
      ${isEdit ? 'editing' : ''}`}
    >
      <div className="labels-list full flex column align-center">
        {board.columns[statusIdx()].labels.map((label, idx) => {
          return isEdit ? (
            <div key={label.id} className="color-option-editing flex">
              <div className="drag flex align-center">
                <Drag />
              </div>
              <div
                className="input-wrapper flex"
                style={{
                  outline:
                    hoverColor?.idx === idx ? '1px solid #0073ea' : 'none',
                }}
              >
                <div
                  className="color-box btn"
                  style={{
                    backgroundColor:
                      hoverColor?.idx === idx && hoverColor?.color
                        ? hoverColor?.color
                        : label.color,
                  }}
                  onClick={() => {
                    setColor((prevState) => {
                      return hoverColor.idx === idx
                        ? { ...prevState, idx: null }
                        : { ...prevState, idx };
                    });
                  }}
                >
                  <FiDroplet className="drop-hover" />
                </div>
                <div
                  className="label-input"
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onBlur={(ev) =>
                    onEditLabel(
                      statusIdx(),
                      ev.target.innerText,
                      idx,
                      statusIdx(),
                      label.title
                    )
                  }
                  style={{
                    backgroundColor:
                      hoverColor?.idx === idx ? hoverColor?.color : '#f5f6f8',
                    color:
                      hoverColor?.idx === idx && hoverColor?.color
                        ? '#fff'
                        : '#323338',
                  }}
                >
                  {label.title}
                </div>
              </div>
              <div
                className="delete-label btn flex align-center"
                onClick={() => onRemoveLabel(idx, statusIdx())}
              >
                <CloseSmall className="delete-icon" />
              </div>
            </div>
          ) : (
            <div
              key={label.color}
              className="label flex align-center justify-center btn text-cmp"
              style={{ backgroundColor: label.color }}
              onClick={(ev) => {
                ev.stopPropagation();
                onChangeStatus(item, group, board.columns[statusIdx()], label);
                toggleMenu(toggleMenus);
              }}
            >
              {label.title}
            </div>
          );
        })}
        {isEdit && (
          <div
            style={{
              backgroundColor:
                hoverColor?.idx || hoverColor?.idx === 0
                  ? '#fff'
                  : hoverColor?.color,
              color: hoverColor?.color ? '#fff' : '#c4c4c4',
            }}
            className="add-label-placeholder flex align-center justify-center btn"
            onClick={() => {
              onAddLabel(statusIdx());
            }}
          >
            New Label
          </div>
        )}
      </div>
      {isEdit && (
        <StatusColorPalette
          setColor={setColor}
          hoverColor={hoverColor}
          onAddLabel={onAddLabel}
          statusIdx={statusIdx}
          onEditLabel={onEditLabel}
        />
      )}
      <div className="divider"></div>
      <div
        className="edit-label flex align-center justify-center btn"
        onClick={(ev) => {
          ev.stopPropagation();
          setIsEdit(!isEdit);
        }}
      >
        {!isEdit && <Edit />}
        {isEdit ? 'Apply' : 'Add/Edit Labels'}
      </div>
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
  saveLabel,
  removeLabel,
};

export const StatusMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StatusMenu);
