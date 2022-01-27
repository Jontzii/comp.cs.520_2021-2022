import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../RequestStatus';

test('renders with text content matching status prop', () => {
  render(<RequestStatus status='status' />);
  const statusElement = screen.getByText('status');
  expect(statusElement).toBeInTheDocument();
});

test('renders with className "request-status"', () => {
  render(<RequestStatus status='status' />);
  const statusElement = screen.getByText('status');
  expect(statusElement).toBeInTheDocument();
  expect(statusElement).toHaveClass('request-status');
});
