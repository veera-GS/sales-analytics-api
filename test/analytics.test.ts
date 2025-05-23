import request from 'supertest';
import app from '../app';
import { getMongodb } from '../mongodb';
import { seedDatabase } from './datas';

// Mock your MongoDB calls for isolated tests
jest.mock('../services/analytics.service', () => ({
  getTotalCustomers: jest.fn(() => Promise.resolve(10)),
  getTotalOrders: jest.fn(() => Promise.resolve(20)),
  getAverageOrderValue: jest.fn(() => Promise.resolve(150.5)),
}));


describe('Analytics Routes', () => {

 beforeAll(async () => {
    const mongoDB = await getMongodb();
    const collections = mongoDB.collections();

    for (const collection in collections) {
      await mongoDB.collection(collection).deleteMany({});
    }
  });

  beforeAll(async () => {
        const mongoDB = await getMongodb();
   seedDatabase(mongoDB)
  });
  describe('GET /api/analytics/total-customers', () => {
    it('should return total customers for valid date range', async () => {
      const res = await request(app).get('/api/analytics/total-customers')
        .query({ startDate: '2024-01-01', endDate: '2024-12-31' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalCustomers', 10);
    });

    it('should return 400 for missing dates', async () => {
      const res = await request(app).get('/api/analytics/total-customers')
        .query({ startDate: '2024-01-01' }); // no endDate

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/analytics/total-orders', () => {
    it('should return total orders for valid date range', async () => {
      const res = await request(app).get('/api/analytics/total-orders')
        .query({ startDate: '2024-01-01', endDate: '2024-12-31' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalOrders', 20);
    });

    it('should return 400 for invalid date', async () => {
      const res = await request(app).get('/api/analytics/total-orders')
        .query({ startDate: 'not-a-date', endDate: '2024-12-31' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/analytics/average-order-value', () => {
    it('should return average order value for valid date range', async () => {
      const res = await request(app).get('/api/analytics/average-order-value')
        .query({ startDate: '2024-01-01', endDate: '2024-12-31' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('averageOrderValue', 150.5);
    });
  });
});
