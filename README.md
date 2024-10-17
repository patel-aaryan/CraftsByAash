# CraftsByAash (Coming Soon)

This project is a full-stack ecommerce platform designed for showcasing and selling Lippan Art Decor. The platform enables users to create accounts, browse products, and securely place orders with Stripe integration. It is built using Django for the backend, Next.js for the frontend, MySQL for database management, and Docker for containerization. AWS services, including RDS and S3, are used for cloud storage, hosting, and database management.

## Features

- **User Authentication**: Secure JWT-based login and registration system.

- **Product Showcase**: Dynamically displays available artwork with detailed descriptions and prices.
- **Shopping Cart**: Allows users to add items to a cart and proceed with an order.
- **Payment Processing**: Integrates Stripe for secure payments and order processing.
- **Order Management**: Tracks user orders and displays order history.
- **Cloud Storage**: Stores media (artwork images) on AWS S3 and delivers content via CDN for fast loading.
- **Scalable Deployment**: Utilizes Docker and AWS RDS for production-level scaling and reliability.

## Technologies Used

- **Backend**: Django, Django Rest Framework
- **Frontend**: Next.js, React, Tailwind CSS
- **Database**: MySQL (AWS RDS)
- **Payment Processing**: Stripe
- **Cloud**: AWS RDS, AWS S3
- **Containerization**: Docker
- **Authentication**: JSON Web Tokens (JWT)
- **Version Control**: Git
- **Deployment**: AWS, Vercel

## Prerequisites

- Python 3.12.2
- Node.js (v18.x)
- MySQL (or use AWS RDS for production)
- Docker
- AWS Account (with access to S3, RDS)
- Stripe Account

# Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/patel-aaryan/CraftsByAash.git
cd CraftsByAash
```

### 2. Backend Setup

```bash
cd backend
```

### 3. Frontend Setup

```bash
cd frontend
```

# API Endpoints

## Product Management

- `/store/products/`
- `/store/products/{id}/`

## Shopping Cart

- `/store/cart/`
- `/store/cart/{cart_id}/`
- `/store/cart/{cart_id}/items/`

## Orders

- `store/orders/`

## Authentication

- `/auth/jwt/create/`
- `/auth/jwt/refresh/`
- `/auth/users/me/`

## User Management
