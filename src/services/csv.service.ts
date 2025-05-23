import fs from 'fs';
import csvParser from 'csv-parser';
import { getMongodb } from '../../mongodb';
export const processCSV = async (filePath: string) => {

  const db = await getMongodb()
  
  const customers = db.collection("customers");
  const products = db.collection("products");
  const orders = db.collection("orders");

  const stream = fs.createReadStream(filePath).pipe(csvParser());

  for await (const row of stream) {
    await products.updateOne(
      { productId: row["Product ID"] },
      { $setOnInsert: { productId: row["Product ID"], name: row["Product Name"], category: row["Category"] } },
      { upsert: true }
    );

    await customers.updateOne(
      { customerId: row["Customer ID"] },
      {
        $setOnInsert: {
          customerId: row["Customer ID"],
          name: row["Customer Name"],
          email: row["Customer Email"],
          address: row["Customer Address"]
        }
      },
      { upsert: true }
    );

    await orders.updateOne(
      { orderId: row["Order ID"] },
      {
        $set: {
          productId: row["Product ID"],
          customerId: row["Customer ID"],
          region: row["Region"],
          dateOfSale: new Date(row["Date of Sale"]),
          quantitySold: +row["Quantity Sold"],
          unitPrice: +row["Unit Price"],
          discount: +row["Discount"],
          shippingCost: +row["Shipping Cost"],
          paymentMethod: row["Payment Method"]
        }
      },
      { upsert: true }
    );
  }
};
