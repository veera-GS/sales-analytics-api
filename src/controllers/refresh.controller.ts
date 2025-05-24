import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { catchAsyncError } from '../core/catcherror';
import { processCSV } from '../services/csv.service';

export const refreshData = catchAsyncError(async (req: Request, res: Response) => {
  const uploadsDir = path.join(__dirname, '../middlewares/uploads'); // adjust if needed

  // Get list of files sorted by modified date (latest first)
  const files = fs.readdirSync(uploadsDir)
    .filter(file => file.endsWith('.csv'))
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(uploadsDir, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length === 0) {
    return res.status(404).json({ message: 'No CSV files found in uploads folder' });
  }

  const latestFile = files[0].name;
  const filePath = path.join(uploadsDir, latestFile);

  try {
    await processCSV(filePath);
    res.json({ message: `Data refreshed successfully from ${latestFile}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing file', error });
  }
});
