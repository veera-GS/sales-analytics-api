import path from 'path';
import request from 'supertest';
import app from '../app';

describe('Upload and Refresh Routes', () => {
  jest.setTimeout(10000); // for slow file processing

  describe('POST /api/upload', () => {
    it('should reject if no file is provided', async () => {
      const res = await request(app).post('/api/upload');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('CSV file is required');
    });

    it('should accept a valid CSV file', async () => {
      const res = await request(app)
        .post('/api/upload')
        .attach('file', path.join(__dirname, 'sample.csv'));

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('CSV uploaded and data saved');
    });
  });

  describe('POST /api/refresh', () => {
    it('should start the data refresh', async () => {
      const res = await request(app).post('/api/refresh');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Data refresh started');
    });

    it('should prevent multiple refreshes', async () => {
      // Trigger refresh first time
      await request(app).post('/api/refresh');
      // Second call immediately
      const res = await request(app).post('/api/refresh');

      expect(res.status).toBe(429);
      expect(res.body.message).toBe('Refresh already in progress');
    });
  });
});
