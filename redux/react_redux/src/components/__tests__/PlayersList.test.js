
/**
 * @jest-environment jsdom
 */

/** @format */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlayersList } from '../PlayersList';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { addPlayer } from '../../redux/actionCreators/playersActions';
import * as redux from 'react-redux'


let mockStore;
beforeEach(() => {
	mockStore = configureMockStore();
});

test('renders a list with id "players-list"', () => {
	render(
		<Provider store={mockStore({players: [] })}>
			<PlayersList />
		</Provider>
	);
	const listElem = screen.getByRole('list');
	expect(listElem).toBeInTheDocument();
	expect(listElem.id).toBe('players-list');
});

test('renders a list with id "players-list"', () => {
	render(
		<Provider store={mockStore({players: [{name:"mölli",isActive:false, id:1}] })}>
			<PlayersList />
		</Provider>
	);
	const listElem = screen.getByRole('list');
	expect(listElem).toBeInTheDocument();
	expect(listElem.id).toBe('players-list');
});

test('list contains as many items as there are in players prop', () => {
	const players = [
		{
			id: 1,
			name: 'Player One',
			isActive: true,
		},
		{
			id: 2,
			name: 'Player Two',
			isActive: false,
		}
	];

	const spy = jest.spyOn(redux, 'useSelector')
	spy.mockReturnValue({ players: players })
	const store = mockStore({ players: players })
	store.dispatch = jest.fn();
	const { container } = render(
		<Provider store={store}>
			<PlayersList />
		</Provider>

	);
	const listItems = screen.getAllByRole('listitem');
	expect(listItems.length).toBe(players.length);
});

test('list items have ids of the form "player-{id}"', () => {
	const players = [
		{
			id: 1,
			name: 'Player One',
			isActive: true,
		},
		{
			id: 2,
			name: 'Player Two',
			isActive: false,
		},
	];
	const spy = jest.spyOn(redux, 'useSelector')
	spy.mockReturnValue({ players: players })
	const store = mockStore({ players: players })
	store.dispatch = jest.fn();
	render(
		<Provider store={mockStore({ players })}>
			<PlayersList />
		</Provider>
	);
	const listItems = screen.getAllByRole('listitem');

	listItems.forEach((item, i) => {
		expect(item.id).toBe(`player-${players[i].id}`);
	});
});

