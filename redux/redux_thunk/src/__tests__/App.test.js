/**
 * @format
 */
/* eslint-disable testing-library/no-container*/
/* eslint-disable testing-library/no-node-access */
import {
	fireEvent,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { server, rest } from '../mocks/server';
import App from '../App';
import { players } from '../mocks/players';
import { Provider } from 'react-redux';
import store from '../redux/store';

test('should fetch players from backend when first loaded', async () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const listItems = await screen.findAllByRole('listitem');

	expect(listItems.length).toEqual(players.length);
	listItems.forEach((item, i) => {
		expect(item.id).toBe(`player-${players[i].id}`);
	});
});

test('should show error status when loading players fails', async () => {
	server.use(
		rest.get('/api/players', (req, res, ctx) => {
			res(ctx.networkError('Network error'));
		})
	);
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	expect(
		await screen.findByText('An error has occurred!!!')
	).toBeInTheDocument();
});

test('should fetch single player data from backend when link is clicked', async () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	UserEvent.click(linkElement);

	expect(await screen.findByText('not active')).toBeInTheDocument();
	expect(
		screen.getByText(`${players[0].id}`, { selector: 'div.player-id' })
	).toBeInTheDocument();
	expect(
		screen.getByText(players[0].name, { selector: 'div.player-name' })
	).toBeInTheDocument();
});

test('should show error status when clicking link and loading player data fails', async () => {
	server.use(
		rest.get('/api/players/:playerId', (req, res, ctx) => {
			res(ctx.networkError('Network error'));
		})
	);

	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	UserEvent.click(linkElement);

	expect(
		await screen.findByText('An error has occurred!!!')
	).toBeInTheDocument();
});

test('should send POST request to backend and add new player to "#players-list"', async () => {
	const { container } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const name = container.querySelector('input[name="name"]');
	await UserEvent.type(name, 'New Player', { delay: 10 });

	const form = container.querySelector('form');
	fireEvent.submit(form);

	await waitFor(() => screen.findByText(/New Player/i, { selector: 'a' }));
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length + 1);
	expect(container.querySelector('.request-status').textContent.trim()).toBe(
		''
	);
});

test('should show error status and not add new player if POST request fails', async () => {
	server.use(
		rest.post('/api/players', (req, res, ctx) => {
			res(ctx.networkError('Network error'));
		})
	);

	const { container } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const name = container.querySelector('input[name="name"]');
	await UserEvent.type(name, 'New Player', { delay: 10 });

	const form = container.querySelector('form');
	fireEvent.submit(form);

	expect(
		await screen.findByText('An error has occurred!!!')
	).toBeInTheDocument();
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});

test('should send DELETE request to backend and delete player when "Delete" button is clicked', async () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	await UserEvent.click(linkElement);

	const button = await screen.findByText(/delete/i);
	UserEvent.click(button);

	await waitForElementToBeRemoved(() =>
		screen.queryByText(players[0].name, { selector: 'a' })
	);
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length - 1);
});

test('should show error status and not delete player if DELETE request fails', async () => {
	server.use(
		rest.delete('/api/players/:playerId', (req, res, ctx) => {
			res(ctx.networkError('Network error'));
		})
	);

	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	UserEvent.click(linkElement);

	const button = await screen.findByText(/delete/i);
	UserEvent.click(button);

	await waitFor(() => screen.findByText('An error has occurred!!!'));
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});
