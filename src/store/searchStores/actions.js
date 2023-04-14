import { createAction } from "@reduxjs/toolkit";

let captureTextStores = createAction(
    'captureTextStores',
    ({ inputText}) =>{

        return{
            payload:{textStores: inputText}
        }
        
    }
)

const actions = {captureTextStores}

export default actions