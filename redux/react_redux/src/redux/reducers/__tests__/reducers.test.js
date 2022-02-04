/** @format */

import { players } from '../../../mocks/players';
import {
	ADD_PLAYER,
	REMOVE_PLAYER
} from '../../constants';
import {playersReducer} from '../playersReducer';

describe('playersReducer', () => {
	it('should return the initial state when no matching type in switch-case', () => {
		expect(playersReducer(undefined, {})).toEqual({"players": []})
	});

	it('should handle ADD_PLAYER by adding it to the state', () => {
		const playerToAdd = {
			id: 0,
			isActive: true,
			name: 'Bob',
		};
		const addAction = {
			type: ADD_PLAYER,
			payload: playerToAdd,
		};
		expect(playersReducer(undefined, addAction)["players"]["0"]).toEqual(playerToAdd);
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
		expect(playersReducer({players:[playerToRemove]}, removeAction)).toEqual({players: []});
	});
});

