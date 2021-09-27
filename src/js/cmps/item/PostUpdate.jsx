import { Component } from 'react';

export class PostUpdate extends Component {
    state = {
        update: {
            txt:''
        }
    }
    handleChange = (ev) => {
        ev.preventDefault();
        const field = ev.target.name;
        if (!field) return;
        const value = ev.target.value;
        console.log(value);
        this.setState((prevState) => ({ update: { ...prevState.update, [field]: value } }));
    };

    onPost = (ev) => {
        ev.preventDefault();
        this.props.onPost(this.state.update);
    };

    render() {
        const { txt } = this.state.update;
        return (
            <form className='' onSubmit={this.onPost}>
                <div className='input-filter'>
                    <input
                        name='txt'
                        id='txt'
                        type='textarea'
                        placeholder='Write an update'
                        value={txt}
                        onChange={this.handleChange}
                    />
                </div>
                <button>Add update</button>
            </form>
        )
    }
}