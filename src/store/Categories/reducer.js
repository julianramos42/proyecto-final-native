import { createReducer } from "@reduxjs/toolkit";
import categoryActions from './actions'
const {captureCategories} = categoryActions 

const initiateState= {
    categories: [],
}

const reducer = createReducer(
    initiateState,
    (builder) => builder
    .addCase(
        captureCategories,
        (state,action) => {
            let newState = {
                ...state,
                categories : action.payload.categories  
            }
            return newState
        }
    )
    
)

export default reducer