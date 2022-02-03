/** @format */

import { players } from '../../../mocks/players';
import {
	ADD_PLAYER,
	CLEAR_SELECTED_PLAYER,
	REMOVE_PLAYER,
	SET_PLAYERS,
	SET_SELECTED_PLAYER,
	SET_STATUS,
} from '../../constants';
import playersReducer from '../playersReducer';
import selectedPlayerReducer from '../selectedPlayerReducer';
import statusReducer, { requestStatus } from '../statusReducer';

describe('playersReducer', () => {
	it('should return the initial state when no matching type in switch-case', () => {
		expect(playersReducer(undefined, {})).toEqual([]);
	});
	it('should handle SET_PLAYERS by returning its payload', () => {
		const payload = players.map((player) => ({
			id: player.id,
			name: player.name,
		}));
		const setPlayers = {
			type: SET_PLAYERS,
			payload,
		};
		expect(playersReducer(undefined, setPlayers)).toEqual(setPlayers.payload);
	});

	it('should handle ADD_PLAYER by adding it to the state', () => {
		const playerToAdd = {
			id: 10,
			name: 'Bob',
		};
		const addAction = {
			type: ADD_PLAYER,
			payload: playerToAdd,
		};
		expect(playersReducer(undefined, addAction)).toEqual([playerToAdd]);
	});
	it('should handle REMOVE_PLAYER by removing a player whose id === payload from the store', () => {
		const playerToRemove = {
			id: 10,
			name: 'Bob',
		};
		const removeAction = {
			type: REMOVE_PLAYER,
			payload: playerToRemove.id,
		};
		expect(playersReducer([playerToRemove], removeAction)).toEqual([]);
	});
});

describe('statusReducer', () => {
	it('should return the initial state when no matching type in switch-case', () => {
		expect(statusReducer(undefined, {})).toEqual(requestStatus.LOADING);
	});
	for (const state of ['LOADING', 'READY', 'ERROR']) {
		it(`Payload ${state}: should handle SET_STATUS by returning requestStatus[${state}]`, () => {
			const payload = state;
			const setStatus = {
				type: SET_STATUS,
				payload,
			};
			expect(statusReducer(undefined, setStatus)).toEqual(
				requestStatus[payload]
			);
		});
	}
});

describe('selectedPlayerReducer', () => {
	it('should return the initial state when no matching type in switch-case', () => {
		expect(selectedPlayerReducer(undefined, {})).toEqual({});
	});
	it(`should handle SET_SELECTED_PLAYER by returning payload`, () => {
		const payload = players[0];
		const setSelectedPlayer = {
			type: SET_SELECTED_PLAYER,
			payload,
		};
		expect(selectedPlayerReducer(undefined, setSelectedPlayer)).toEqual(
			payload
		);
	});
	it(`should handle CLEAR_SELECTED_PLAYER by returning payload`, () => {
		const playerToClear = players[0];
		const setSelectedPlayer = {
			type: CLEAR_SELECTED_PLAYER,
		};
		expect(selectedPlayerReducer(playerToClear, setSelectedPlayer)).toEqual({});
	});
});
