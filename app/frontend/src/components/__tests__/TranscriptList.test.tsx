import { render, screen, within } from '@testing-library/react';
import { TranscriptList } from '../TranscriptList';
import { TranscriptRecord } from '@/models/transcript';

const transcripts: TranscriptRecord[] = [
  {
    id: 'alpha',
    title: 'Discovery Call',
    description: 'Team spricht über einen neuen Datensatz.',
    audioUrl: 'https://example.com/audio.mp3',
    updatedAt: '2024-12-03T10:00:00Z',
    segments: []
  },
  {
    id: 'beta',
    title: 'User Research',
    description: 'Interview Zusammenfassung',
    audioUrl: 'https://example.com/audio2.mp3',
    updatedAt: '2024-11-28T12:00:00Z',
    segments: []
  }
];

describe('TranscriptList', () => {
  it('lists available transcripts with detail links', () => {
    render(<TranscriptList transcripts={transcripts} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(screen.getByText('Verfügbare Transkripte')).toBeInTheDocument();

    const firstLink = within(items[0]).getByRole('link', { name: 'Öffnen' });
    expect(firstLink).toHaveAttribute('href', '/transcripts/alpha');
    expect(within(items[1]).getByRole('link', { name: 'Öffnen' })).toHaveAttribute('href', '/transcripts/beta');
  });
});
