import { getMongodb } from "../../mongodb";

export const getTotalCustomers = async (start: Date, end: Date) => {

    const db =await getMongodb()
  const orders = db.collection('orders');
  const result = await orders.aggregate([
    {
      $match: {
        dateOfSale: { $gte: new Date(start), $lte: new Date(end) }
      }
    },
    {
      $group: {
        _id: "$customerId"
      }
    },
    {
      $count: "totalCustomers"
    }
  ]).toArray();

  console.log('result',result);
  

  return result[0]?.totalCustomers || 0;
};

export const getTotalOrders = async (start: Date, end: Date) => {
        const db =await getMongodb()

  const orders = db.collection('orders');
  const result = await orders.countDocuments({
    dateOfSale: { $gte: start, $lte: end }
  });
  return result;
};

export const getAverageOrderValue = async (start: Date, end: Date) => {
        const db =await getMongodb()

  const orders = db.collection('orders');
  const result = await orders.aggregate([
    {
      $match: {
        dateOfSale: { $gte: start, $lte: end }
      }
    },
    {
      $project: {
        orderTotal: {
          $add: [
            { $multiply: ["$quantitySold", "$unitPrice"] },
            "$shippingCost"
          ]
        },
        discount: "$discount"
      }
    },
    {
      $project: {
        finalTotal: {
          $subtract: ["$orderTotal", { $multiply: ["$orderTotal", "$discount"] }]
        }
      }
    },
    {
      $group: {
        _id: null,
        averageOrderValue: { $avg: "$finalTotal" }
      }
    }
  ]).toArray();

  return result[0]?.averageOrderValue || 0;
};
