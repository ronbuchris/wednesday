import { Component } from 'react';
import { connect } from 'react-redux';

import Email from 'monday-ui-react-core/dist/icons/Email';
import Mobile from 'monday-ui-react-core/dist/icons/Mobile';
import Calendar from 'monday-ui-react-core/dist/icons/Calendar';
import { getById } from '../store/actions/user.actions'
class _UserDetails extends Component {
  componentDidMount() {
    const {userId} = this.props.match.params;
    this.props.getById(userId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.props.getById(this.props.match.params.userId)

    }
  }
  render() {
    const {member} = this.props;
    if (!member) return <div>loading</div>
    return (
      <div className="user-details">
      <header className="user-header">
          <img src={member.img} alt="" className="user-img" />
          <h1>{member.fullname}</h1>
      </header>
      <div className="user-content">
        <h3>Overview</h3>
        <h4>
          <Email />
          Email:
        </h4>
        <h4>
          <Mobile />
          Phone:
        </h4>
        <h4>
          <Calendar />
          Birthday:
        </h4>
      </div>
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    member: state.userModule.member,
  };
}
const mapDispatchToProps = {
  getById
};
export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails);
