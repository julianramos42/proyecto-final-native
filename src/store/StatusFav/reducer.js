import { createReducer } from "@reduxjs/toolkit";
import statusFavActions from './actions'
const {captureStatusFav} = statusFavActions

const initiateState= {
    statusFav: false,
}

const reducer = createReducer(
    initiateState,
    (builder) => builder
    .addCase(
        captureStatusFav,
        (state,action) => {
            let newState = {
                ...state,
                statusFav : action.payload.statusFav  
            }
            return newState
        }
    )
    
)

export default reducer