import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { PlayerLink } from '../PlayerLink';

test('renders a link with text content matching name prop', () => {
  render(<PlayerLink url='' onClick={() => {}} name='Player Name' />);
  const linkElement = screen.getByRole('link');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toEqual('Player Name');
});

test('href attribute matches url prop', () => {
  render(<PlayerLink url='/player/id' onClick={() => {}} name='Player Name' />);
  const linkElement = screen.getByRole('link');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '/player/id');
});

test('onClick callback is called when link is clicked', () => {
  const clickHandler = jest.fn();
  render(<PlayerLink url='#' onClick={clickHandler} name='Player Name' />);

  const linkElement = screen.getByRole('link');
  UserEvent.click(linkElement);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler.mock.calls[0][0]).toBe('#');
});
