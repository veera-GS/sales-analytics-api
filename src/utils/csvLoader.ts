import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import {getMongodb} from '../../mongodb'
export async function loadCSV(filePath: string) {
  const db = await getMongodb();
  const ordersCollection = db.collection('orders');

  const orders: any[] = [];
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(path.resolve(filePath))
      .pipe(csv())
      .on('data', (row) => {
        orders.push({
          orderId: row['Order ID'],
          productId: row['Product ID'],
          customerId: row['Customer ID'],
          productName: row['Product Name'],
          category: row['Category'],
          region: row['Region'],
          dateOfSale: new Date(row['Date of Sale']),
          quantitySold: Number(row['Quantity Sold']),
          unitPrice: Number(row['Unit Price']),
          discount: Number(row['Discount']),
          shippingCost: Number(row['Shipping Cost']),
          paymentMethod: row['Payment Method'],
          customerName: row['Customer Name'],
          customerEmail: row['Customer Email'],
          customerAddress: row['Customer Address']
        });
      })
      .on('end', async () => {
        await ordersCollection.deleteMany({});
        await ordersCollection.insertMany(orders);
        resolve();
      })
      .on('error', reject);
  });
}
