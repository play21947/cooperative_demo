import { combineReducers } from "redux";
import AuthReducer from "./reducers/AuthReducer";

const AllReducers = combineReducers({
    auth: AuthReducer
})


export default AllReducers