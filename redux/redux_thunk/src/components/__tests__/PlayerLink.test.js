/** @format */

import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { PlayerLink } from '../PlayerLink';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getSelectedPlayer } from '../../redux/actionCreators/thunks/PlayerLink';

let mockStore;
beforeEach(() => {
	const middlewares = [thunk];
	mockStore = configureMockStore(middlewares);
	// const submitHandler = jest.fn();
});

test('renders a link with text content matching name prop', () => {
	render(
		<Provider store={mockStore({})}>
			<PlayerLink url='' name='Player Name' />
		</Provider>
	);
	const linkElement = screen.getByRole('link');
	expect(linkElement).toBeInTheDocument();
	expect(linkElement.textContent).toEqual('Player Name');
});

test('href attribute matches url prop', () => {
	render(
		<Provider store={mockStore({})}>
			<PlayerLink url='/player/id' name='Player Name' />
		</Provider>
	);
	const linkElement = screen.getByRole('link');
	expect(linkElement).toBeInTheDocument();
	expect(linkElement).toHaveAttribute('href', '/player/id');
});

test('onClick callback is called when link is clicked', () => {
	const store = mockStore({});
	store.dispatch = jest.fn();
	render(
		<Provider store={store}>
			<PlayerLink url='#' name='Player Name' />
		</Provider>
	);
	const linkElement = screen.getByRole('link');
	UserEvent.click(linkElement);

	expect(store.dispatch).toHaveBeenCalledTimes(1);
	expect(store.dispatch.mock.calls[0][0].toString()).toBe(
		getSelectedPlayer().toString()
	);
});
