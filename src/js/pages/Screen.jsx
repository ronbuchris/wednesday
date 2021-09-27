import { connect } from 'react-redux';
import { toggleMenu } from '../store/actions/workspace.actions';

export function _Screen({ toggleMenu }) {
  return (
    <div
      className="screen"
      onClick={() => {
        toggleMenu(false);
      }}
    ></div>
  );
}

const mapDispatchToProps = {
  toggleMenu,
};

export const Screen = connect(null, mapDispatchToProps)(_Screen);
