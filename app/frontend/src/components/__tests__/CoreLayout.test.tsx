import React from 'react';
import { render, screen } from '@testing-library/react';
import { CoreLayout } from '../CoreLayout';

describe('CoreLayout', () => {
  it('renders navigation and children', () => {
    render(
      <CoreLayout>
        <p>Inner content</p>
      </CoreLayout>
    );

    expect(screen.getByText('Gecko Next')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Transkripte' })).toHaveAttribute('href', '/transcripts/alpha');
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });
});
