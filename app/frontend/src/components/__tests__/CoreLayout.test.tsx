import { render, screen } from '@testing-library/react';
import { CoreLayout } from '../CoreLayout';

describe('CoreLayout', () => {
  it('renders navigation and children', () => {
    render(
      <CoreLayout>
        <div>Child content</div>
      </CoreLayout>
    );

    expect(screen.getByText('Gecko Next')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Transkripte' })).toHaveAttribute('href', '/transcripts/alpha');
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
