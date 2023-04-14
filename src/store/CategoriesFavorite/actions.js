import { createAction } from "@reduxjs/toolkit";

let captureCategoriesFav = createAction(
    'captureCategoriesFav',
    ({ inputCategory }) => {

        return {
            payload: { categoriesFav: inputCategory}
        }

    }
)

const actions = {captureCategoriesFav}

export default actions