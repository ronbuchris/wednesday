import { connect } from 'react-redux';
import { toggleMenu } from '../store/actions/board.actions';

export function _Screen({ toggleMenu, toggleMenus }) {
  const darkScreen = () => {
    if (toggleMenus.isWorkspaceModal || toggleMenus.isBoardModal) return true;
    return false;
  };

  return (
    <div
      className={`screen ${darkScreen() && 'dark'}`}
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
