import type { NextApiRequest, NextApiResponse } from 'next';
import { exportTranscript } from '@/services/transcriptService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).json({ message: 'Missing transcript id' });
    return;
  }

  const body = exportTranscript(id);
  if (!body) {
    res.status(404).json({ message: 'Transcript not found' });
    return;
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(body);
}
