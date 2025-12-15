import React from 'react';
import { render, screen } from '@testing-library/react';
import transcripts from '@/data/transcripts.json';
import { TranscriptList } from '../TranscriptList';

describe('TranscriptList', () => {
  it('lists available transcripts with links', () => {
    render(<TranscriptList transcripts={transcripts} />);

    const openLinks = screen.getAllByRole('link', { name: 'Öffnen' });

    transcripts.forEach((entry, index) => {
      expect(screen.getByText(entry.title)).toBeInTheDocument();
      expect(screen.getByText(entry.description)).toBeInTheDocument();
      expect(openLinks[index]).toHaveAttribute('href', `/transcripts/${entry.id}`);
    });
  });
});
