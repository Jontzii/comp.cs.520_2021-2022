import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import App from '../App';
import { players } from '../mocks/players';
import { rest, server } from '../mocks/server';

test('should fetch all players from backend after successful login', async () => {
  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitFor(() => container.querySelector('input[name="name"]'));
  const listItems = await screen.findAllByRole('listitem');

  expect(listItems).toHaveLength(players.length);
  listItems.forEach((item, i) => {
    expect(item.id).toBe(`player-${players[i].id}`);
  });
});

test('should show logout link after login', async () => {
  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  const logoutButton = await screen.findByText(/logout/i);
  expect(logoutButton).toBeInTheDocument();
});

test('should show error status after failed login (incorrect credentials)', async () => {
  server.use(
    rest.get('/api/players', (req, res, ctx) => {
      return res(ctx.status(403), ctx.json({ error: 'Check username and password' }));
    })
  );

  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
});

test('should remove players from DOM after logout', async () => {
  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  const logoutButton = await screen.findByText(/logout/i);
  expect(logoutButton).toBeInTheDocument();

  await UserEvent.click(logoutButton);
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});

test('should show logout link after successful registration', async () => {
  const { container } = render(<App />);
  const registrationLink = screen.getByRole('link', { text: /register/i });
  UserEvent.click(registrationLink);

  const username = await screen.findByLabelText(/username/i);
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  const logoutButton = await screen.findByText(/logout/i);
  expect(logoutButton).toBeInTheDocument();
});

test('should fetch all players from backend after successful registration', async () => {
  const { container } = render(<App />);
  const registrationLink = screen.getByRole('link', { text: /register/i });
  UserEvent.click(registrationLink);

  const username = await screen.findByLabelText(/username/i);
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitFor(() => container.querySelector('input[name="name"]'));
  const listItems = await screen.findAllByRole('listitem');

  expect(listItems).toHaveLength(players.length);
  listItems.forEach((item, i) => {
    expect(item.id).toBe(`player-${players[i].id}`);
  });
});

test('should show error status after failed registration (invalid credentials)', async () => {
  server.use(
    rest.post('/api/users', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ error: { username: 'username already taken' } }));
    })
  );

  const { container } = render(<App />);
  const registrationLink = screen.getByRole('link', { text: /register/i });
  UserEvent.click(registrationLink);

  const username = await screen.findByLabelText(/username/i);
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
});

test('should show error status when loading players fails', async () => {
  server.use(
    rest.get('/api/players', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
});

test('should fetch single player data from backend when link is clicked', async () => {
  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitFor(() => container.querySelector('input[name="name"]'));
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  UserEvent.click(linkElement);

  expect(await screen.findByText('not active')).toBeInTheDocument();
  expect(screen.getByText(`${players[0].id}`, { selector: 'div.player-id' })).toBeInTheDocument();
  expect(screen.getByText(players[0].name, { selector: 'div.player-name' })).toBeInTheDocument();
});

test('should show error status when clicking link and loading player data fails', async () => {
  server.use(
    rest.get('/api/players/:playerId', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitFor(() => container.querySelector('input[name="name"]'));
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  UserEvent.click(linkElement);

  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
});

test('should send POST request to backend and add new player to "#players-list"', async () => {
  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitFor(() => container.querySelector('input[name="name"]'));
  const name = container.querySelector('input[name="name"]');
  await UserEvent.type(name, 'New Player', { delay: 10 });

  const addForm = container.querySelector('form');
  fireEvent.submit(addForm);

  await screen.findByText(/New Player/i, { selector: 'a' });
  expect(screen.getAllByRole('listitem')).toHaveLength(players.length + 1);
  expect(container.querySelector('.request-status').textContent.trim()).toBe('');
});

test('should show error status and not add new player if POST request fails', async () => {
  server.use(
    rest.post('/api/players', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitFor(() => container.querySelector('input[name="name"]'));
  const name = container.querySelector('input[name="name"]');
  await UserEvent.type(name, 'New Player', { delay: 10 });

  const addForm = container.querySelector('form');
  fireEvent.submit(addForm);

  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});

test('should send DELETE request to backend and delete player when "Delete" button is clicked', async () => {
  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitFor(() => container.querySelector('input[name="name"]'));
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  await UserEvent.click(linkElement);

  const button = await screen.findByText(/delete/i);
  UserEvent.click(button);

  await waitForElementToBeRemoved(() => screen.queryByText(players[0].name, { selector: 'a' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(players.length - 1);
});

test('should show error status and not delete player if DELETE request fails', async () => {
  server.use(
    rest.delete('/api/players/:playerId', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  const { container } = render(<App />);
  const username = container.querySelector('#auth-form input[name="username"]');
  await UserEvent.type(username, 'username', { delay: 10 });

  const password = container.querySelector('#auth-form input[name="password"]');
  await UserEvent.type(password, 'password', { delay: 10 });

  const authForm = container.querySelector('#auth-form');
  fireEvent.submit(authForm);

  await waitFor(() => container.querySelector('input[name="name"]'));
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  await UserEvent.click(linkElement);

  const button = await screen.findByText(/delete/i);
  UserEvent.click(button);

  await screen.findByText('An error has occurred!!!');
  expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});
