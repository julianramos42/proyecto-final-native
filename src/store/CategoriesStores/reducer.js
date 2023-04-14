import { createReducer } from "@reduxjs/toolkit";
import categoryStoresActions from './actions'
const {captureCategoriesStores} = categoryStoresActions 

const initiateState= {
    categoriesStores: [],
}

const reducer = createReducer(
    initiateState,
    (builder) => builder
    .addCase(
        captureCategoriesStores,
        (state,action) => {
            let newState = {
                ...state,
                categoriesStores : action.payload.categoriesStores  
            }
            return newState
        }
    )
    
)

export default reducer