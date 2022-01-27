import { render, screen, fireEvent } from '@testing-library/react';
import { AddPlayer } from '../AddPlayer';

test('Renders a form', () => {
  const { container } = render(<AddPlayer handleSubmit={() => {}} />);
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('Form includes text input for player name', () => {
  const { container } = render(<AddPlayer handleSubmit={() => {}} />);
  const input = container.querySelector('input[type="text"][name="name"]');
  expect(input).toBeInTheDocument();
  expect(input.id).toBe('name');
});

test('Form includes checkbox for player activity', () => {
  const { container } = render(<AddPlayer handleSubmit={() => {}} />);
  const input = container.querySelector('input[type="checkbox"][name="active"]');
  expect(input).toBeInTheDocument();
  expect(input.id).toBe('active');
});

test('Form includes a submit button', () => {
  render(<AddPlayer handleSubmit={() => {}} />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button.getAttribute('type')).toBe('submit');
});

test('handleSubmit callback is called when form is submitted', () => {
  const submitHandler = jest.fn();
  const { container } = render(<AddPlayer handleSubmit={submitHandler} />);

  const form = container.querySelector('form');
  fireEvent.submit(form);

  expect(submitHandler).toHaveBeenCalledTimes(1);
});
