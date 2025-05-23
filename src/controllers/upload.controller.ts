import { Request, Response } from 'express';
import { processCSV } from '../services/csv.service';
import { catchAsyncError } from '../core/catcherror';

export const uploadAndProcess =catchAsyncError( async (req: Request, res: Response) => {
  try {
    console.log('request data logs',req.file);
    
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'CSV file is required' });
    }

    await processCSV(file.path);

    res.status(200).json({ message: 'CSV processed and MongoDB refreshed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to process CSV', error: err });
  }
});
