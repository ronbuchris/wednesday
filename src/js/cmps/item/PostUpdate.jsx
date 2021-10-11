import { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react'; 
// import FroalaEditor from 'react-froala-wysiwyg';

export class PostUpdate extends Component {
 state = {
      update: '',
    };


  handleModelChange = (e) => {
    this.setState({
      update: e.target.getContent()
    })
  };
  onPost = () => {
    this.props.onPost(this.state.update);
    this.setState({ update: '' });
  };
  
  render() {
    return (
      <div>
        <div>
        <Editor
          apiKey="8oty9fy177hya366jthfhnnfan4vpydo8mqzzb04z3c5sapy"
          initialValue=""
          init={{
            max_height: 145,
            resize: false,
            menubar: false,
            plugins: [
              'advlist autolink lists link image',
              'charmap print preview anchor help',
              'searchreplace visualblocks code',
              'insertdatetime media table paste wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
          }}
          onChange={this.handleModelChange} />
        </div>
        <div className="side-panel-actions flex align-center space-between btn">
          <div className="left-side-actions flex">
            <div className="add-files">Add files</div>
            <div className="gif">GIF</div>
            <div className="emoji">Emoji</div>
            <div className="mention">Mention</div>
          </div>
          <div
            className="update-btn br4"
            onClick={(ev) => {
              ev.preventDefault();
              this.onPost();
            }}
            >
            Update
          </div>
        </div>
      </div>
    );
  }
}

{/* <FroalaEditor
  model={this.state.model}
  onModelChange={this.handleModelChange}
/> */}
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
