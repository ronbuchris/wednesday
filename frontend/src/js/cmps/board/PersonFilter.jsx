import { Component } from 'react';
import { connect } from 'react-redux';

class _PersonFilter extends Component {
  render() {
    const { board } = this.props;
    return <div className="menu-modal"></div>;
  }
}

const mapDispatchToProps = {};
export const PersonFilter = connect(null, mapDispatchToProps)(_PersonFilter);
