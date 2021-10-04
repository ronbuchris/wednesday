import { Component } from 'react';
import { connect } from 'react-redux';
import Search from 'monday-ui-react-core/dist/icons/Search';
import { onSetSearch } from '../../store/actions/item.actions';

class _BoardSearch extends Component {
  state = {
    searchBy: {
      itemTitle: '',
    },
    isSearch: false,
  };

  handleChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    if (!field) return;
    const value = ev.target.value;
    this.setState(
      (prevState) => ({ searchBy: { ...prevState.searchBy, [field]: value } }),
      () => {
        this.props.onSetSearch(this.props.board, this.state.searchBy);
      }
    );
  };

  onSearch = (ev) => {
    ev.preventDefault();
    this.props.onSetSearch(this.props.board, this.state.searchBy);
  };

  render() {
    const { itemTitle } = this.state.searchBy;
    return (
      <div
        className={`btn-search search flex br4 align-center justify-center ${
          this.state.isSearch ? 'searching' : ''
        }`}
      >
        <Search />
        <input
          className="input-search"
          name="itemTitle"
          id="itemTitle"
          type="text"
          placeholder="Search"
          value={itemTitle}
          onChange={this.handleChange}
          onBlur={(e) => {
            this.setState({ isSearch: false });
          }}
          onFocus={(e) => {
            this.setState({ isSearch: true });
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  onSetSearch,
};
export const BoardSearch = connect(null, mapDispatchToProps)(_BoardSearch);
