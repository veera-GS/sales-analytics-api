This API provides sales analytics functionality, including features for uploading and processing CSV files, refreshing data, and retrieving sales insights such as top products. It supports the following features:

CSV Upload & Data Processing: Upload a CSV file, process it in the background, and trigger data refreshes.

Sales Analytics: Retrieve top products based on different parameters like overall, category, and region.

Data Refresh: Refresh data based on the most recent uploaded CSV file.

Table of Contents Features

API Routes

Upload CSV
POST /api/upload
Upload a CSV file of historical retail sales data.

POST /api/refresh

Total Customers
GET /api/analytics/total-customers?startDate=2024-01-01&endDate=2024-12-31

Total Orders
GET /api/analytics/total-orders?startDate=2024-01-01&endDate=2024-12-31

Average Order Value
GET /api/analytics/average-order-value?startDate=2024-01-01&endDate=2024-12-31

1. Clone the repository
   git clone https://github.com/veera-GS/sales-analytics-api.git cd

2. Install dependencies
   npm install

3. Set environment variables
   Create a .env file in the root of the project and configure the necessary environment variables (e.g., MongoDB URI.)

4. Start the application
   npm run start For local development, the application runs on http://localhost:3000.

Testing
Running Tests You can run the tests for the API using Jest and Supertest. To run the tests:

Set up a test environment (Make sure to configure test MongoDB).

Run the tests:
npm test

This will run all the test cases, including those for uploading CSV files and triggering data refresh.
