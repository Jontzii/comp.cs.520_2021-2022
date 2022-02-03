/** @format */

import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../RequestStatus';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

let mockStore;
beforeEach(() => {
	const middlewares = [thunk];
	mockStore = configureMockStore(middlewares);
	// const submitHandler = jest.fn();
});

test('renders with text content matching status prop', () => {
	render(
		<Provider store={mockStore({ status: 'status' })}>
			<RequestStatus />
		</Provider>
	);
	const statusElement = screen.getByText('status');
	expect(statusElement).toBeInTheDocument();
});

test('renders with className "request-status"', () => {
	render(
		<Provider store={mockStore({ status: 'status' })}>
			<RequestStatus />
		</Provider>
	);
	const statusElement = screen.getByText('status');
	expect(statusElement).toBeInTheDocument();
	expect(statusElement).toHaveClass('request-status');
});
