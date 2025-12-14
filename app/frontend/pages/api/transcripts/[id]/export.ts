import type { NextApiRequest, NextApiResponse } from 'next';
import { exportTranscript } from '@/services/transcriptService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    res.status(400).json({ error: 'invalid id' });
    return;
  }

  const payload = exportTranscript(id);
  if (!payload) {
    res.status(404).json({ error: 'not found' });
    return;
  }

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', `attachment; filename="${id}.txt"`);
  res.status(200).send(payload);
}
