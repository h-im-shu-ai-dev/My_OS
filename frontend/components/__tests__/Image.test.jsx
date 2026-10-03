import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Image } from '../Image';

describe('Image Component', () => {
  it('renders informative image with valid alt text and no aria-hidden attribute', () => {
    render(<Image src="/logo.png" alt="Company Logo" data-testid="informative-img" />);
    const img = screen.getByTestId('informative-img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/logo.png');
    expect(img).toHaveAttribute('alt', 'Company Logo');
    expect(img).not.toHaveAttribute('aria-hidden');
  });

  it('renders decorative image with empty alt and aria-hidden="true" when isDecorative is true', () => {
    render(<Image src="/banner.png" alt="Decorative Banner" isDecorative={true} data-testid="decorative-img" />);
    const img = screen.getByTestId('decorative-img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/banner.png');
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders informative image when isDecorative is explicitly false', () => {
    render(<Image src="/avatar.jpg" alt="User Profile" isDecorative={false} data-testid="avatar-img" />);
    const img = screen.getByTestId('avatar-img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'User Profile');
    expect(img).not.toHaveAttribute('aria-hidden');
  });

  it('forwards additional props such as className and style to img element', () => {
    render(<Image src="/pic.jpg" alt="Picture" className="rounded-full" data-testid="styled-img" />);
    const img = screen.getByTestId('styled-img');

    expect(img).toHaveClass('rounded-full');
  });
});
