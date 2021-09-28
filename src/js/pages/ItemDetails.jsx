import { Component } from 'react';
import { connect } from 'react-redux';

import { loadItem, onPost} from '../store/actions/item.actions'
import { loadBoard} from '../store/actions/board.actions'
import { getWorkspaceByBoardId} from '../store/actions/workspace.actions'
import { ItemUpdates } from '../cmps/item/ItemUpdates';
import { PostUpdate } from '../cmps/item/PostUpdate';

class _ItemDetails extends Component {

    componentDidMount(){
        const { boardId,itemId } = this.props.match.params
        this.props.loadItem(boardId, itemId)
    }

    onPost = async (update) => {
        const { user, workspace,history,onPost,match,item,loadItem} = this.props
        const { boardId,itemId } = match.params
        await onPost(update, user, item, workspace)
        loadItem(boardId, itemId)
        history.push(`/board/${boardId}/item/${itemId}`)
    }
    render() {
        const {item } = this.props
        if (!item ) return <div className="">loading</div>
        return (
            <div>
                <h1>{item.title}</h1>
                <PostUpdate onPost={this.onPost}/>
                <ItemUpdates updates={item.updates}/>
                </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        workspace: state.workspaceModule.workspace,
        item: state.itemModule.item,
        

    };
}

const mapDispatchToProps = {
    loadItem,
    getWorkspaceByBoardId,
    loadBoard,
    onPost
};
export const ItemDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ItemDetails);
