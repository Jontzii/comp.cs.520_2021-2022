import { render, screen } from '@testing-library/react';
import { PlayerInfo } from '../PlayerInfo';

test('renders a div with id "selected-player"', () => {
  const player = {
    id: 1,
    name: 'Player One',
    isActive: true
  };

  const { container } = render(<PlayerInfo player={player} />);
  const infoElement = container.querySelector('div#selected-player');
  expect(infoElement).toBeDefined();
  expect(infoElement).toBeInTheDocument();
});

test('renders active player correctly', () => {
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<PlayerInfo player={activePlayer} />);
  expect(screen.getByText(`${activePlayer.id}`, { selector: 'div#selected-player div.player-id' })).toBeInTheDocument();
  expect(screen.getByText(activePlayer.name, { selector: 'div#selected-player div.player-name' })).toBeInTheDocument();
  expect(screen.getByText('active', { selector: 'div#selected-player div.player-status' })).toBeInTheDocument();
});

test('renders inactive player correctly', () => {
  const inactivePlayer = {
    id: 2,
    name: 'Inactive Player',
    isActive: false
  };

  render(<PlayerInfo player={inactivePlayer} />);
  expect(screen.getByText(`${inactivePlayer.id}`, { selector: 'div#selected-player div.player-id' })).toBeInTheDocument();
  expect(screen.getByText(inactivePlayer.name, { selector: 'div#selected-player div.player-name' })).toBeInTheDocument();
  expect(screen.getByText('not active', { selector: 'div#selected-player div.player-status' })).toBeInTheDocument();
});
