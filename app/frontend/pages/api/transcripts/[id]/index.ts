import type { NextApiRequest, NextApiResponse } from 'next';
import { getTranscript, saveTranscript } from '@/services/transcriptService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    res.status(400).json({ error: 'invalid id' });
    return;
  }

  if (req.method === 'GET') {
    const transcript = getTranscript(id);
    if (!transcript) {
      res.status(404).json({ error: 'not found' });
      return;
    }
    res.status(200).json(transcript);
    return;
  }

  if (req.method === 'PUT') {
    const text = req.body?.text;
    const updated = saveTranscript(id, text, 0);
    if (!updated) {
      res.status(404).json({ error: 'not found' });
      return;
    }
    res.status(200).json(updated);
    return;
  }

  res.status(405).setHeader('Allow', 'GET, PUT').end();
}
