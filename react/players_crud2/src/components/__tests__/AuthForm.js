import { fireEvent, render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { AuthForm } from '../AuthForm';

test('renders a form with id "auth-form"', () => {
  const { container } = render(<AuthForm handleSubmit={() => {}} />);
  expect(container.querySelector('form#auth-form')).toBeInTheDocument();
});

test('form has a text input for username', () => {
  const { container } = render(<AuthForm handleSubmit={() => {}} />);
  const input = container.querySelector('input[type="text"][name="username"]');
  expect(input).toBeInTheDocument();
  expect(input.id).toBe('username');
});

test('form has a password input', () => {
  const { container } = render(<AuthForm handleSubmit={() => {}} />);
  const input = container.querySelector('input[type="password"][name="password"]');
  expect(input).toBeInTheDocument();
  expect(input.id).toBe('password');
});

test('initially heading and submit button show "Log In" and link has text "Register"', () => {
  render(<AuthForm handleSubmit={() => {}} />);

  expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
});

test('clicking link toggles heading and submit button to "Register" and link to "Log In"', async () => {
  render(<AuthForm handleSubmit={() => {}} />);

  UserEvent.click(screen.getByRole('link', { name: /register/i }));
  expect(await screen.findByRole('heading', { name: /register/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

test('handleSubmit callback is called with "true" when form is submitted during "Log In"', () => {
  const submitHandler = jest.fn();
  const { container } = render(<AuthForm handleSubmit={submitHandler} />);

  const username = container.querySelector('input[type="text"][name="username"]');
  const password = container.querySelector('input[type="password"][name="password"]');
  const form = container.querySelector('form#auth-form');

  UserEvent.type(username, 'username', { delay: 10 });
  UserEvent.type(password, 'password', { delay: 10 });
  fireEvent.submit(form);

  expect(submitHandler).toHaveBeenCalledTimes(1);
  expect(submitHandler.mock.calls[0][0]).toBe(true);
});

test('handleSubmit callback is called with "false" when form is submitted during "Registration"', async () => {
  const submitHandler = jest.fn();
  const { container } = render(<AuthForm handleSubmit={submitHandler} />);

  UserEvent.click(screen.getByRole('link', { name: /register/i }));
  await screen.findByRole('link', { name: /log in/i });

  const username = container.querySelector('input[type="text"][name="username"]');
  const password = container.querySelector('input[type="password"][name="password"]');
  const form = container.querySelector('form#auth-form');

  UserEvent.type(username, 'username', { delay: 10 });
  UserEvent.type(password, 'password', { delay: 10 });
  fireEvent.submit(form);

  expect(submitHandler).toHaveBeenCalledTimes(1);
  expect(submitHandler.mock.calls[0][0]).toBe(false);
});
