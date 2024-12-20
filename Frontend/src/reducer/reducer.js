import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/auth"  
import profileReducer from "../slices/profile"
import classReducer from "../slices/classlist"

// importing all reducer which is made into slices;

const rootReducer  = combineReducers({                  // combining all reducer;
    auth: authReducer,
    profile:profileReducer,
    classes:classReducer,
})

export default rootReducer

