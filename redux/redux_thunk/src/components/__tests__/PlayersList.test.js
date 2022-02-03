/** @format */

import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { PlayersList } from '../PlayersList';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

let mockStore;
beforeEach(() => {
	const middlewares = [thunk];
	mockStore = configureMockStore(middlewares);
	// const submitHandler = jest.fn();
});

test('renders a list with id "players-list"', () => {
	render(
		<Provider store={mockStore({ players: [] })}>
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
		},
	];
	render(
		<Provider store={mockStore({ players })}>
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

test('list items contain links to players', () => {
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
	render(
		<Provider store={mockStore({ players })}>
			<PlayersList />
		</Provider>
	);
	const listItems = screen.getAllByRole('listitem');
	const linkItems = screen.getAllByRole('link');

	listItems.forEach((item, i) => {
		expect(item).toContainElement(linkItems[i]);
	});
});
