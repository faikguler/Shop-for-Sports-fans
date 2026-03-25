# Shop for Sports Fans 🏆

A modern full‑stack e‑commerce platform designed for sports enthusiasts. Browse products, add items to your cart, place orders, and leave reviews. The admin panel provides full control over products, orders, users, and site content.

## 🚀 Live Demo

[Visit the live site](https://shop-for-sports-fans.onrender.com)  
*Demo accounts:*  
- **Admin:** `admin@example.com` / `admin123`  
- **User:** `user@example.com` / `user123`

## 📝 Description

Shop for Sports Fans is a complete online shop built for sports lovers. It offers a seamless shopping experience for jerseys, equipment, and accessories across multiple sports. The platform features:

- A **customer‑facing React app** (powered by Vite)  
- A **Node.js + Express backend** with a PostgreSQL or Mysql database  
- A **comprehensive admin panel** to manage products, orders, users, and more  

All authentication is handled with JWT, and the cart persists in localStorage. The site is fully responsive and styled with Bootstrap 5.

## ✨ Features

### 🛒 Customer Features
- **Product browsing** – View products with images, prices, and categories  
- **Product details** – See full description, gallery, and add to cart  
- **Shopping cart** – Update quantities, remove items, see total  
- **Checkout** – Enter shipping address and payment method  
- **Order history** – View past orders and their details  
- **User authentication** – Register, login, and manage profile  
- **Product reviews** – Leave ratings and comments (logged‑in users only)  
- **Dynamic pages** – About, FAQ, shipping info, etc. (editable via admin)  
- **Newsletter subscription** – Stay updated with offers  
- **Contact form** – Send messages to the store  
- **Homepage slider** – Rotating banners managed through admin

### 🔧 Admin Features
- **Dashboard** – View key stats (orders, revenue, users, products)  
- **Product management** – Add, edit, delete products with multiple images  
- **Category management** – Organise products  
- **Order management** – View all orders, update status (pending, shipped, delivered, cancelled)  
- **User management** – View, edit, delete users (make admin)  
- **Review management** – View and delete customer reviews  
- **Page management** – Create/update static pages (e.g., About, FAQs) with a rich text editor (TinyMCE)  
- **Slider management** – Upload up to 5 images for the homepage carousel  
- **Newsletter management** – View subscribers, toggle active status, delete  
- **Contact message management** – View and delete messages from the contact form

## 🛠️ Tech Stack

### Frontend
- React
- Vite (build tool)
- React Router
- Bootstrap 5 (styling)
- Axios (HTTP client)

### Backend
- Node.js
- Express
- PostgreSQL or Mysql (with Sequelize ORM)
- JWT (authentication)
- bcrypt (password hashing)
- Multer (file uploads)
- TinyMCE (rich text editor)

### Deployment
- Backend and frontend are served together from a single Render Web Service
- PostgreSQL hosted on Render

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/faikguler/Shop-for-Sports-fans.git
   cd Shop-for-Sports-fans

2. **Install dependencies**
    ```bash
    npm install

3. **Set up environment variables**
    Copy .env.example to .env and fill in your database credentials and secrets:

    ```bash
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=sportshop
    JWT_SECRET=your_jwt_secret
    VITE_TINYMCE_API_KEY=your_tinymce_api_key
    DB_PORT=db_port_number 
    DB_DIALECT=mysql_or_postgre

4. **Create the database**
    If using PostgreSQL or Mysql locally, create a database named sportshop.

5. **Run database migrations (or sync)**
    ```bash
    npm run dev

6. **Seed the database (optional)**
    ```bash
    npm run seed


### ▶️Deployment
- Backend runs on http://localhost:5000
- Frontend runs on http://localhost:5175

    ```bash
    npm run dev:all

### 🤝Production

    ```bash
    npm run build   # builds the frontend
    npm start       # starts the server (serves built frontend + API)

### License

- This project is licensed under the ISC License. See the LICENSE file for details.



### 👥Team

**Coders of the Apocalypse**
- Faik
- Abdul
- Blaize

 Built with ❤️ for the final project.