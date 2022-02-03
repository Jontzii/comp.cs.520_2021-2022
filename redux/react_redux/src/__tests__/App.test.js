
/**
 * @jest-environment jsdom
 */

/**
 * @format
 */
/* eslint-disable testing-library/no-container*/
/* eslint-disable testing-library/no-node-access */
import React from 'react';
import {
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import App from '../App';

import { players } from '../mocks/players';
import { Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { addPlayer, removePlayer } from '../redux/actionCreators/playersActions';
import { PlayersList } from '../components/PlayersList';
import * as redux from 'react-redux'



let mockStore;
beforeEach(() => {
	const middlewares = [];
	mockStore = configureMockStore(middlewares);
});

test('renders a list with id "players-list"', async () => {
	render(
		<Provider store={mockStore({ players: players })}>
			<App />
		</Provider>
	);
	const listElem = await screen.getByRole('list');
	expect(listElem).toBeInTheDocument();
	expect(listElem.id).toBe('players-list');
});


test('should add a new player to store"', async () => {

	const store = mockStore({ players: players })
	store.dispatch = jest.fn();

	const { container } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const name = "Mölli"
	const nameField = container.querySelector('input[name="name"]');
	await UserEvent.type(nameField, name, { delay: 10 });

	const form = container.querySelector('form');
	fireEvent.submit(form);

	await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
	expect(store.dispatch.mock.calls[0][0].toString()).toBe(
		addPlayer().toString())
	expect(store.dispatch.mock.calls[0][0]["payload"]["name"]).toBe(name)

});


test('should send REMOVE_PLAYER request to backend when "Remove" button is clicked', async function () {


	const spy = jest.spyOn(redux, 'useSelector')
	spy.mockReturnValue({ players: players })
	const store = mockStore({ players: players })
	store.dispatch = jest.fn();
	const { container } = render(
		<Provider store={store}>
			<PlayersList />
		</Provider>

	);


	const listItems = await screen.findAllByRole('listitem');
	const button = listItems[0].querySelector('button');
	await UserEvent.click(button);

	await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
	expect(store.dispatch.mock.calls[0][0].toString()).toBe(
		removePlayer().toString())
});


test('should send REMOVE_PLAYER request with correct payload', async function () {


	const spy = jest.spyOn(redux, 'useSelector')
	spy.mockReturnValue({ players: players })
	const store = mockStore({ players: players })
	store.dispatch = jest.fn();
	const { container } = render(
		<Provider store={store}>
			<PlayersList />
		</Provider>

	);

	const listItems = await screen.findAllByRole('listitem');
	const button = listItems[0].querySelector('button');
	await UserEvent.click(button);
	await waitFor(() => expect(store.dispatch.mock.calls[0][0]["payload"]).toBe(1))
});

