import { connect } from 'react-redux';
import { toggleMenu } from '../store/actions/board.actions';

export function _Screen({ toggleMenu, toggleMenus }) {
  return (
    <div
      className={`screen ${
        toggleMenus.isWorkspaceModal || (toggleMenus.isBoardModal && 'dark')
      }`}
      onClick={() => {
        toggleMenu(toggleMenus);
      }}
    ></div>
  );
}

const mapDispatchToProps = {
  toggleMenu,
};

export const Screen = connect(null, mapDispatchToProps)(_Screen);
