import { createReducer } from "@reduxjs/toolkit";
import statusActions from './actions'
const {captureStatus} = statusActions

const initiateState= {
    status: false,
}

const reducer = createReducer(
    initiateState,
    (builder) => builder
    .addCase(
        captureStatus,
        (state,action) => {
            let newState = {
                ...state,
                status : action.payload.status  
            }
            return newState
        }
    )
    
)

export default reducer