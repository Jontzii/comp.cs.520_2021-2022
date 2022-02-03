
/**
 * @jest-environment jsdom
 */

/** @format */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import configureMockStore from 'redux-mock-store';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AddPlayer } from '../AddPlayer';
import { addPlayer } from '../../redux/actionCreators/playersActions';

let store;

beforeEach(() => {
	const middlewares = [];
	const mockStore = configureMockStore(middlewares);
	store = mockStore({});
});

test('Renders a form', () => {
	const { container } = render(
		<Provider store={store}>
			<AddPlayer />
		</Provider>
	);
	expect(container.querySelector('form')).toBeInTheDocument();
});

test('Form includes text input for player name', () => {
	const { container } = render(
		<Provider store={store}>
			<AddPlayer />
		</Provider>
	);
	const input = container.querySelector('input[type="text"][name="name"]');
	expect(input).toBeInTheDocument();
	expect(input.id).toBe('name');
});

test('Form includes checkbox for player activity', () => {
	const { container } = render(
		<Provider store={store}>
			<AddPlayer />
		</Provider>
	);
	const input = container.querySelector(
		'input[type="checkbox"][name="active"]'
	);
	expect(input).toBeInTheDocument();
	expect(input.id).toBe('active');
});

test('Form includes a submit button', async () => {
	render(
		<Provider store={store}>
			<AddPlayer />
		</Provider>
	);
	const button = await screen.getByRole('button');
	expect(button).toBeInTheDocument();
	expect(button.getAttribute('type')).toBe('submit');
});

test('addPlayer is dispatched when form is submitted with played info', async () => {
	store.dispatch = jest.fn();
	const { container } = render(
		<Provider store={store}>
			<AddPlayer />
		</Provider>
	);
	const form = container.querySelector('form');
	fireEvent.submit(form);
	await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
	expect(store.dispatch.mock.calls[0][0].toString()).toBe(
		addPlayer().toString()
	);
});


