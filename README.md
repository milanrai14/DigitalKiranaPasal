# 🛒 Digital Kirana

**Digital Kirana** is a full-stack e-commerce web application designed to bring traditional grocery shopping into the digital world. It enables customers to browse grocery products, manage shopping carts, and place orders online with integrated digital payment functionality through Khalti.

The application is developed using React, Node.js, TypeScript, and MySQL, providing a modern and user-friendly online grocery shopping experience.

## ✨ Features

- **Product Browsing:** Explore available grocery products.
- **Shopping Cart:** Add, update, and remove products from the cart.
- **Order Management:** Place and manage grocery orders.
- **Khalti Payment Integration:** Support digital payments through Khalti.
- **Database Management:** Store and manage application data using MySQL.
- **Responsive Interface:** User-friendly shopping experience.
- **REST API:** Backend API for communication between frontend and backend.

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- HTML5
- CSS3

### Backend
- Node.js
- TypeScript
- Express.js
- REST API

### Database
- MySQL
- XAMPP
- phpMyAdmin

### Payment Gateway
- Khalti Payment Integration

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm


### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd client
npm install
npm run dev
```

### 3. Backend Setup

Open another terminal and navigate to the backend directory:

```bash
cd server
npm install
npm run dev
```

### 4. Database Configuration

1. Install and open XAMPP.
2. Start Apache and MySQL.
3. Open phpMyAdmin.
4. Create a MySQL database for Digital Kirana.
5. Configure the database connection in the backend environment variables.
6. Import the SQL database file if available.

### 5. Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=digital_kirana
DB_PORT=3306

KHALTI_SECRET_KEY=your_khalti_secret_key
```

**Note:** Configure the environment variables according to your local setup. Never expose your Khalti secret key or commit your `.env` file to GitHub.

## 💳 Khalti Payment Integration

Digital Kirana integrates the Khalti Payment Gateway to enable digital payments.

The integration supports:

- Initiating payment requests through Khalti.
- Redirecting customers to the Khalti payment interface.
- Verifying payment transactions through the backend.
- Handling payment responses and updating order payment status.

## 🗄️ Database

MySQL is used as the primary relational database, with XAMPP providing the local database server.

The database manages:

- User information
- Grocery product details
- Shopping cart information
- Customer orders
- Payment transaction records

## 🚀 Future Improvements

- Advanced product search and filtering.
- Product reviews and ratings.
- Order tracking.
- Admin dashboard.
- Inventory management.
- Email notifications.
- Enhanced security and authentication.

## 👨‍💻 Developer

**Milan Rai**

GitHub: [@milanrai14](https://github.com/milanrai14)

## 📄 License

This project is developed for educational and portfolio purposes.
