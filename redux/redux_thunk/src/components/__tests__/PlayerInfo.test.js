/**
 *
 * @format
 */

/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/** @format */

import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { PlayerInfo } from '../PlayerInfo';

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { deleteSelectedPlayer } from '../../redux/actionCreators/thunks/PlayerInfo';

let mockStore;
beforeEach(() => {
	const middlewares = [thunk];
	mockStore = configureMockStore(middlewares);
	// const submitHandler = jest.fn();
});

test('renders a div with id "selected-player"', () => {
	const selectedPlayer = {
		id: 1,
		name: 'Player One',
		isActive: true,
	};
	const { container } = render(
		<Provider store={mockStore({ selectedPlayer })}>
			<PlayerInfo />
		</Provider>
	);

	const infoElement = container.querySelector('div#selected-player');
	expect(infoElement).toBeDefined();
	expect(infoElement).toBeInTheDocument();
});

test('renders active player correctly', () => {
	const selectedPlayer = {
		id: 1,
		name: 'Active Player',
		isActive: true,
	};
	render(
		<Provider store={mockStore({ selectedPlayer })}>
			<PlayerInfo />
		</Provider>
	);
	expect(
		screen.getByText(`${selectedPlayer.id}`, {
			selector: 'div#selected-player div.player-id',
		})
	).toBeInTheDocument();
	expect(
		screen.getByText(selectedPlayer.name, {
			selector: 'div#selected-player div.player-name',
		})
	).toBeInTheDocument();
	expect(
		screen.getByText('active', {
			selector: 'div#selected-player div.player-status',
		})
	).toBeInTheDocument();
});

test('renders inactive player correctly', () => {
	const selectedPlayer = {
		id: 2,
		name: 'Inactive Player',
		isActive: false,
	};
	render(
		<Provider store={mockStore({ selectedPlayer })}>
			<PlayerInfo />
		</Provider>
	);
	expect(
		screen.getByText(`${selectedPlayer.id}`, {
			selector: 'div#selected-player div.player-id',
		})
	).toBeInTheDocument();
	expect(
		screen.getByText(selectedPlayer.name, {
			selector: 'div#selected-player div.player-name',
		})
	).toBeInTheDocument();
	expect(
		screen.getByText('not active', {
			selector: 'div#selected-player div.player-status',
		})
	).toBeInTheDocument();
});

test('renders "Delete" button with class "delete-btn"', () => {
	const selectedPlayer = {
		id: 1,
		name: 'Active Player',
		isActive: true,
	};
	render(
		<Provider store={mockStore({ selectedPlayer })}>
			<PlayerInfo />
		</Provider>
	);
	expect(
		screen.getByRole('button', { selector: 'div#selected-player .delete-btn' })
	).toBeInTheDocument();
});

test('deleteSelectedPlayer is dispatched when "Delete" button is clicked', () => {
	const selectedPlayer = {
		id: 1,
		name: 'Active Player',
		isActive: true,
	};
	const store = mockStore({ selectedPlayer });
	store.dispatch = jest.fn();
	render(
		<Provider store={store}>
			<PlayerInfo />
		</Provider>
	);
	const button = screen.getByRole('button', {
		selector: 'div#selected-player .delete-btn',
	});
	UserEvent.click(button);

	expect(store.dispatch).toHaveBeenCalledTimes(1);
	expect(store.dispatch.mock.calls[0][0].toString()).toBe(
		deleteSelectedPlayer().toString()
	);
});
