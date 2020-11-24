import {
    GET_POSTS_STARTED,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
} from '../actions/actionsPosts/actionsPosts';

const initialState = {
    postsLoading: false,
    postsSuccess: null,
    postsError: null
}

export default function PostsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return {
                ...state,
                postsLoading: true
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                postsSuccess: action.payload,
                postsLoading: false
            };
        case GET_POSTS_FAILURE:
            return {
                ...state,
                postsError: action.payload,
                postsLoading: false
            };
        default:
            return state
    }
}