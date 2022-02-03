/** @format */

import configureMockStore from 'redux-mock-store';
import {
	ADD_PLAYER,
	REMOVE_PLAYER
} from '../../constants';
import { addPlayer, removePlayer } from '../playersActions';

let store;
const mockStore = configureMockStore();
beforeEach(() => {
	store = mockStore({});
});

describe('Testing action creators', () => {
	describe('addPlayer:', () => {
		it('returns an action with type ADD_PLAYER to the frontends reducers', async () => {
			const playerToAdd = {
				id: 10,
				name: 'Bob',
			};
			const action = {
				type: ADD_PLAYER,
				payload: playerToAdd,
			};
			const expectedActions = [action];
			await store.dispatch(addPlayer(playerToAdd));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('removePlayer:', () => {
		it('returns an action with type ADD_PLAYER to the frontends reducers', async () => {
			const testId = 10;
			const action = {
				type: REMOVE_PLAYER,
				payload: testId,
			};
			const expectedActions = [action];
			await store.dispatch(removePlayer(testId));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
});
