import { Component } from 'react';

import FroalaEditor from 'react-froala-wysiwyg';


export class PostUpdate extends Component {

  constructor(){
    super();
    this.handleModelChange = this.handleModelChange.bind(this);
    this.state={
      model:''
    };
  }
  
  
  handleModelChange=(model)=> {
    this.setState({
      model: model
    });
  }
    onPost = () => {
      this.props.onPost(this.state.model);
      this.setState({ model:''});
    };
    
    render(){
      return(
        <div>
    <div>
     <FroalaEditor model={this.state.model} onModelChange={this.handleModelChange}/>
    </div>
    <div className="update-btn btn">
    <div onClick={(ev)=>{
      ev.preventDefault();
      this.onPost()
    }} >Update</div>
    </div>
    </div>
  )
}


}























// export class PostUpdate extends Component {
//   state = {
//     update: {
//       txt: '',
//     },
//   };
//   handleChange = (ev) => {
//     ev.preventDefault();
//     const field = ev.target.name;
//     if (!field) return;
//     const value = ev.target.value;
//     this.setState((prevState) => ({
//       update: { ...prevState.update, [field]: value },
//     }));
//   };

//   onPost = (ev) => {
//     ev.preventDefault();
//     this.props.onPost(this.state.update);
//     this.setState({ update: { txt: '' } });
//   };

//   render() {
//     const { txt } = this.state.update;
//     return (
//       <form className="" onSubmit={this.onPost}>
//         <input
//           className="update-input"
//           name="txt"
//           id="txt"
//           type="textarea"
//           placeholder="Write an update"
//           value={txt}
//           onChange={this.handleChange}
//         />
//         <button>Update</button>
//       </form>
//     );
//   }
// }
