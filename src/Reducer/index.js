import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../Slices/authSlice"
import quizReducer from '../Slices/quizSlice'
const rootReducer  = combineReducers({
    auth: authReducer,
    quiz : quizReducer
})

export default rootReducer