import axios from 'axios';
import { GET_POSTS_STARTED, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from "./actionsPosts";

const getPostsStarted = (payload) => ({ type: GET_POSTS_STARTED, payload: payload });
const getPostsSuccess = (payload) => ({ type: GET_POSTS_SUCCESS, payload: payload });
const getPostsError = (payload) => ({ type: GET_POSTS_FAILURE, payload: payload });

export const getPostsData = () => {
    return dispatch => {
        dispatch(getPostsStarted(true))
        axios
            (`https://jsonplaceholder.typicode.com/posts`, {})
            .then(res => {
                dispatch(getPostsSuccess(res.data))
            })
            .catch(err => {
                dispatch(getPostsError(err))
            })
    }
}

export default {
    getPostsData
}