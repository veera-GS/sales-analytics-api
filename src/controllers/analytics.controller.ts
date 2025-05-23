import { Request, Response } from 'express';
import { getTotalCustomers, getTotalOrders, getAverageOrderValue } from '../services/analytics.service';
import { catchAsyncError } from '../core/catcherror';

// const parseDates = (req: Request) => {
//   const startDate = new Date(req.query.startDate as string);
//   const endDate = new Date(req.query.endDate as string);
//   return { startDate, endDate };
// };

export const totalCustomers =catchAsyncError( async (req: Request, res: Response) => {
  const { startDate, endDate } =  res.locals.reqdata;
  const count = await getTotalCustomers(startDate, endDate);
  res.json({ totalCustomers: count });
});

export const totalOrders =catchAsyncError( async (req: Request, res: Response) => {
  const { startDate, endDate } =  res.locals.reqdata;
  const count = await getTotalOrders(startDate, endDate);
  res.json({ totalOrders: count });
});

export const averageOrderValue =catchAsyncError( async (req: Request, res: Response) => {
  const { startDate, endDate } =  res.locals.reqdata;
  const avg = await getAverageOrderValue(startDate, endDate);
  res.json({ averageOrderValue: avg });
});
