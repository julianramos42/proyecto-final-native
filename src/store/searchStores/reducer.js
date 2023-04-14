import { createReducer } from "@reduxjs/toolkit";
import textStoresActions from './actions'
const {captureTextStores} = textStoresActions

const initiateState= {
    textStores: ''
}

const reducer = createReducer(
    initiateState,
    (builder) => builder
    .addCase(
        captureTextStores,
        (state,action) => {
            let newState = {
                ...state,
                textStores : action.payload.textStores    
            }
            return newState
        }
    )
)

export default reducer