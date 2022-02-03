/** @format STORE */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Redux-devtools extension library
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import selectedPlayerReducer from './reducers/selectedPlayerReducer';
import playersReducer from './reducers/playersReducer';
import statusReducer from './reducers/statusReducer';
/**
 * players
 * status
 * currentPlayer
 */
export const reducers = combineReducers({
	selectedPlayer: selectedPlayerReducer,
	players: playersReducer,
	status: statusReducer,
});

export default createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk))
);
