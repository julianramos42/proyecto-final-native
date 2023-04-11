import { createAction } from "@reduxjs/toolkit";

let captureStatus = createAction(
    'captureStatus',
    ({ inputStatus}) => {

        return {
            payload: { status: inputStatus}
        }

    }
)

const actions = {captureStatus}

export default actions