/** @format */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { server, rest } from '../../../../mocks/server';
import { ERROR, LOADING, READY } from '../../../constants';
import { setStatus } from '../../statusActions';
import { addPlayer, removePlayer, setPlayers } from '../../playersActions';
import { postPlayer } from '../AddPlayer';
import { players } from '../../../../mocks/players';
import {
	clearSelectedPlayer,
	setSelectedPlayer,
} from '../../selectedPlayerActions';
import { getPlayers } from '../PlayersList';
import { getSelectedPlayer } from '../PlayerLink';
import { deleteSelectedPlayer } from '../PlayerInfo';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
	store = mockStore({});
});

describe('Testing thunk action creators', () => {
	describe('postPlayer:', () => {
		it('should dispatch setStatus(LOADING), setStatus(READY), addPlayer(expectedResponse) and clearSelectedPlayer() action on successful requests', async () => {
			const expectedBody = {
				name: 'New Player',
				isActive: false,
			};
			const expectedResponse = {
				id: players.length + 1,
				name: 'New Player',
				isActive: false,
			};
			const expectedActions = [
				setStatus(LOADING),
				setStatus(READY),
				addPlayer(expectedResponse),
				clearSelectedPlayer(),
			];
			await store.dispatch(postPlayer(expectedBody));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(LOADING), setStatus(ERROR) action on unsuccessful requests', async () => {
			server.use(
				rest.post('/api/players', (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);
			const expectedBody = {
				name: 'New Player',
				isActive: false,
			};
			const expectedActions = [setStatus(LOADING), setStatus(ERROR)];
			await store.dispatch(postPlayer(expectedBody));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('getPlayers:', () => {
		it('should dispatch setStatus(LOADING), setStatus(READY), setPlayers(expectedResponse) action on successful requests', async () => {
			const expectedResponse = players.map((player) => ({
				id: player.id,
				name: player.name,
			}));
			const expectedActions = [
				setStatus(LOADING),
				setStatus(READY),
				setPlayers(expectedResponse),
			];
			await store.dispatch(getPlayers());
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(LOADING), setStatus(ERROR) action on unsuccessful requests', async () => {
			server.use(
				rest.get('/api/players', (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);

			const expectedActions = [setStatus(LOADING), setStatus(ERROR)];
			await store.dispatch(getPlayers());
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('getSelectedPlayer:', () => {
		it('should dispatch setStatus(LOADING), setStatus(READY), setSelectedPlayer(expectedResponse) action on successful requests', async () => {
			const expectedResponse = players[0];
			const expectedActions = [
				setStatus(LOADING),
				setStatus(READY),
				setSelectedPlayer(expectedResponse),
			];
			await store.dispatch(
				getSelectedPlayer(`/api/players/${expectedResponse.id}`)
			);
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(LOADING), setStatus(ERROR) action on unsuccessful requests', async () => {
			const player = players[0];
			server.use(
				rest.get(`/api/players/:playerId`, (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);

			const expectedActions = [setStatus(LOADING), setStatus(ERROR)];
			await store.dispatch(getSelectedPlayer(`/api/players/${player.id}`));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('deleteSelectedPlayer:', () => {
		it('should dispatch setStatus(LOADING), setStatus(READY), removePlayer(selectedPlayer.id), clearSelectedPlayer() action on successful requests', async () => {
			const selectedPlayer = players[0];
			const storeWithPlayer = mockStore({ selectedPlayer });
			const expectedActions = [
				setStatus(LOADING),
				setStatus(READY),
				removePlayer(selectedPlayer.id),
				clearSelectedPlayer(),
			];
			await storeWithPlayer.dispatch(deleteSelectedPlayer());
			const actualActions = storeWithPlayer.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(LOADING), setStatus(ERROR) action on unsuccessful requests', async () => {
			const selectedPlayer = players[0];
			const storeWithPlayer = mockStore({ selectedPlayer });
			server.use(
				rest.delete('/api/players/:playerId', (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);

			const expectedActions = [setStatus(LOADING), setStatus(ERROR)];
			await storeWithPlayer.dispatch(deleteSelectedPlayer());
			const actualActions = storeWithPlayer.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
});
