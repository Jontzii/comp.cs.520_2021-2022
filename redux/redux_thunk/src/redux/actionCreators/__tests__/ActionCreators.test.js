/** @format */

import configureMockStore from 'redux-mock-store';
import { setStatus } from '../statusActions';
import {
	ADD_PLAYER,
	CLEAR_SELECTED_PLAYER,
	REMOVE_PLAYER,
	SET_PLAYERS,
	SET_SELECTED_PLAYER,
	SET_STATUS,
} from '../../constants';
import { players } from '../../../mocks/players';
import {
	clearSelectedPlayer,
	setSelectedPlayer,
} from '../selectedPlayerActions';
import { addPlayer, removePlayer, setPlayers } from '../playersActions';

let store;
const mockStore = configureMockStore();
beforeEach(() => {
	store = mockStore({});
});

describe('Testing action creators', () => {
	describe('setStatus:', () => {
		it('returns an action with type SET_STATUS to the frontends reducers along with the payload (String) that is given as a param', async () => {
			const status = 'ERROR';
			const action = {
				type: SET_STATUS,
				payload: status,
			};
			const expectedActions = [action];
			await store.dispatch(setStatus(status));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('setSelectedPlayer:', () => {
		it('returns an action with type SET_SELECTED_PLAYER to the frontends reducers along with the payload (Object) that is given as a param', async () => {
			const player = players[0];
			const action = {
				type: SET_SELECTED_PLAYER,
				payload: player,
			};
			const expectedActions = [action];
			await store.dispatch(setSelectedPlayer(player));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('clearSelectedPlayer:', () => {
		it('returns an action with type CLEAR_SELECTED_PLAYER to the frontends reducers', async () => {
			const action = {
				type: CLEAR_SELECTED_PLAYER,
			};
			const expectedActions = [action];
			await store.dispatch(clearSelectedPlayer());
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('setPlayers:', () => {
		it('returns an action with type SET_PLAYERS to the frontends reducers', async () => {
			const param = players.map((player) => ({
				id: player.id,
				name: player.name,
			}));
			const action = {
				type: SET_PLAYERS,
				payload: param,
			};
			const expectedActions = [action];
			await store.dispatch(setPlayers(param));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
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
