import { createReducer } from "@reduxjs/toolkit";
import textFavActions from './actions'
const {captureTextFav} = textFavActions

const initiateState= {
    textFav: ''
}

const reducer = createReducer(
    initiateState,
    (builder) => builder
    .addCase(
        captureTextFav,
        (state,action) => {
            let newState = {
                ...state,
                textFav : action.payload.textFav   
            }
            return newState
        }
    )
)

export default reducer