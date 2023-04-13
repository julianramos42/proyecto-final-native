import { createAction } from "@reduxjs/toolkit";

let captureStatusFav = createAction(
    'captureStatusFav',
    ({ inputStatus}) => {

        return {
            payload: { statusFav: inputStatus}
        }

    }
)

const actions = {captureStatusFav}

export default actions