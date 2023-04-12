import { createAction } from "@reduxjs/toolkit";

let captureCategoriesStores = createAction(
    'captureCategoriesStores',
    ({ inputCategory }) => {

        return {
            payload: { categoriesStores: inputCategory}
        }

    }
)

const actions = {captureCategoriesStores}

export default actions