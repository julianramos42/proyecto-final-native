import { createReducer } from "@reduxjs/toolkit";
import categoryFavActions from './actions'
const {captureCategoriesFav} = categoryFavActions 

const initiateState= {
    categoriesFav: [],
}

const reducer = createReducer(
    initiateState,
    (builder) => builder
    .addCase(
        captureCategoriesFav,
        (state,action) => {
            let newState = {
                ...state,
                categoriesFav : action.payload.categoriesFav 
            }
            return newState
        }
    )
    
)

export default reducer