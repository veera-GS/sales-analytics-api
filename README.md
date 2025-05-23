# 📊 Sales Analytics API

This API provides a comprehensive **sales analytics** backend with support for uploading and processing CSV files, refreshing data, and retrieving various sales insights, such as top products, total customers, and average order value.

---

## Features

- **CSV Upload & Processing**  
  Upload retail sales data in CSV format and process it in the background.

- **Sales Analytics**  
  Retrieve key sales insights such as:

  - Top products overall
  - Top products by category
  - Top products by region
  - Total customers and orders
  - Average order value

- **Data Refresh**  
  Manually trigger a refresh from the most recently uploaded data.

---

## Table of Contents

- [API Routes](#api-routes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)

---

## API Routes

### Upload CSV

**POST** `/api/upload`  
Upload a CSV file of historical retail sales data.

### Refresh Data

**POST** `/api/refresh`  
Refresh processed analytics from the most recent CSV file.

### Total Customers

**GET** `/api/analytics/total-customers?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### Total Orders

**GET** `/api/analytics/total-orders?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### Average Order Value

**GET** `/api/analytics/average-order-value?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

> Replace `YYYY-MM-DD` with desired date ranges.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/veera-GS/sales-analytics-api.git
cd sales-analytics-api
```
