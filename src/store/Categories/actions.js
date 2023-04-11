import { createAction } from "@reduxjs/toolkit";

let captureCategories = createAction(
    'captureCategories',
    ({ inputCategory }) => {

        return {
            payload: { categories: inputCategory}
        }

    }
)

const actions = {captureCategories}

export default actions