import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from '../IconButton';

describe('IconButton Component', () => {
  it('sets aria-label on the button and aria-hidden="true" and focusable="false" on child SVG', () => {
    render(
      <IconButton aria-label="Close dialog" data-testid="close-btn">
        <svg data-testid="close-svg">
          <path d="M0 0h24v24H0z" />
        </svg>
      </IconButton>
    );

    const button = screen.getByRole('button', { name: 'Close dialog' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Close dialog');

    const svg = screen.getByTestId('close-svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
  });

  it('sets aria-hidden="true" and focusable="false" on icon prop', () => {
    const SearchIcon = (props) => (
      <svg data-testid="search-svg" {...props}>
        <circle cx="10" cy="10" r="5" />
      </svg>
    );

    render(<IconButton icon={<SearchIcon />} aria-label="Search items" />);

    const button = screen.getByRole('button', { name: 'Search items' });
    expect(button).toBeInTheDocument();

    const svg = screen.getByTestId('search-svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
  });

  it('handles click events properly', () => {
    const handleClick = vi.fn();
    render(
      <IconButton aria-label="Menu" onClick={handleClick}>
        <svg data-testid="menu-svg" />
      </IconButton>
    );

    const button = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports ariaLabel and label fallback props', () => {
    render(
      <IconButton ariaLabel="Settings" data-testid="settings-btn">
        <svg />
      </IconButton>
    );

    const button = screen.getByRole('button', { name: 'Settings' });
    expect(button).toBeInTheDocument();
  });
});
