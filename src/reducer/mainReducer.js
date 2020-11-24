import {combineReducers} from "redux";
import PostsReducer from "./postsReducer";

//Основной Reducer - который принимает остальные reducer
export default combineReducers({
    postsReducer: PostsReducer,
});