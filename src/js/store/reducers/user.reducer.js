import { userService } from '../../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser(),
    member: null
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'SET_MEMBER':
            newState = { ...state, member: action.user }
            break;
        default:
    }
    // For debug:
    window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
