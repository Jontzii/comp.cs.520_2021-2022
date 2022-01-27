import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { Logout } from '../Logout';

test('renders a button with id "logout-btn"', () => {
  render(<Logout handleLogout={() => {}} />);
  const button = screen.getByRole('button', { name: /logout/i });

  expect(button).toBeInTheDocument();
  expect(button.id).toBe('logout-btn');
});

test('onClick callback is called when button is clicked', () => {
  const logoutHandler = jest.fn();
  render(<Logout handleLogout={logoutHandler} />);

  const button = screen.getByRole('button', { name: /logout/i });
  UserEvent.click(button);

  expect(logoutHandler).toHaveBeenCalledTimes(1);
});
