import { Request, Response } from 'express';
import { processCSV } from '../services/csv.service';

export const refreshData = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    await processCSV(file.path);
    res.json({ message: 'Data refreshed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing file', error });
  }
};
