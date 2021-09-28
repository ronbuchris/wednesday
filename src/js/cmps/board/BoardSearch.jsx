import { Component } from 'react';
import { connect } from 'react-redux';
import { onSetSearch } from '../../store/actions/item.actions'

class _BoardSearch extends Component {
    state = {
        searchBy: {
            itemTitle: ''
        }
    }
    handleChange = (ev) => {
        ev.preventDefault();
        const field = ev.target.name;
        if (!field) return;
        const value = ev.target.value;
        this.setState(
            (prevState) => ({ searchBy: { ...prevState.searchBy, [field]: value } }),
            () => {
                this.props.onSetSearch(this.props.board,this.state.searchBy);
            }
        );
    };

    onSearch = (ev) => {
        ev.preventDefault();
        this.props.onSetSearch(this.props.board,this.state.searchBy);
    };

    render() {
        const { itemTitle } = this.state.searchBy;
        return (
            <form className='' onSubmit={this.onSearch}>
                <div className='input-filter'>
                    <input
                        name='itemTitle'
                        id='itemTitle'
                        type='text'
                        placeholder='Search'
                        value={itemTitle}
                        onChange={this.handleChange}
                    />
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = {
    onSetSearch
};
export const BoardSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardSearch);
