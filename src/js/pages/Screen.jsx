import { connect } from 'react-redux';
import { toggleMenu } from '../store/actions/board.actions';

export function _Screen({ toggleMenu, toggleMenus }) {
  return (
    <div
      className="screen"
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
