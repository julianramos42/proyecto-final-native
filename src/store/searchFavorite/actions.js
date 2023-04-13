import { createAction } from "@reduxjs/toolkit";

let captureTextFav = createAction(
    'captureTextFav',
    ({ inputText}) =>{

        return{
            payload:{textFav: inputText}
        }
        
    }
)

const actions = {captureTextFav}

export default actions