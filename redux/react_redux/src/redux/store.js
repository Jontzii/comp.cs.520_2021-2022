/** @format STORE */

import { createStore, combineReducers } from "redux";
import { playersReducer } from "./reducers/playersReducer";

const rootReducer = combineReducers({ players: playersReducer });
const store = createStore(rootReducer);

export default store;
