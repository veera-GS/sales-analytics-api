import fs from 'fs';
import { loadCSV } from '../utils/csvLoader';

export async function refreshDataJob() {
  const logFile = 'logs/refresh.log';
  try {
    await loadCSV('data/sales.csv');
    fs.appendFileSync(logFile, `${new Date().toISOString()} - Refresh successful\n`);
  } catch (err) {
    fs.appendFileSync(logFile, `${new Date().toISOString()} - Refresh failed: ${err}\n`);
  }
}
