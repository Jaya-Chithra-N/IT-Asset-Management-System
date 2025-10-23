# 🖥️ IT Asset Management System  

An **IT Asset Management System** built using **Node.js, Express, and MySQL**, designed to manage, assign, and track IT assets efficiently within an organization.  
Admins can manage users and assets, assign them to employees, and track their statuses, while employees can view their assigned assets.

---

## 📁 Project Structure  

```IT-Asset-Management/
│
├── backend/
│   ├── server.js
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── assetController.js
│   │   ├── assignmentController.js
│   │   ├── userController.js
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── assetRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── userRoutes.js
│   │   └── authRoutes.js
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── css/
    │   ├── add-asset.css
    │   ├── add-user.css
    │   ├── admin-dashboard.css
    │   ├── assign-asset.css
    │   ├── employee-dashboard.css
    │   ├── index.css
    │   ├── signup.css
    │   └── style.css
    │
    ├── html/
    │   ├── add-asset.html
    │   ├── add-user.html
    │   ├── admin-dashboard.html
    │   ├── assign-asset.html
    │   ├── employee-dashboard.html
    │   ├── index.html
    │   └── signup.html
    │
    └── js/
        ├── add-asset.js
        ├── add-user.js
        ├── admin-dashboard.js
        ├── assign-asset.js
        ├── employee-dashboard.js
        └── main.js
``` 
---

## 🧩 Tech Stack

- **Frontend:** Built using **HTML**, **CSS**, and **JavaScript** to create responsive and user-friendly interfaces for Admin and Employee dashboards.

- **Backend:** Developed with **Node.js** and **Express.js**, handling API requests, authentication, and all business logic efficiently.

- **Database ORM:** Utilizes **Sequelize**, an Object Relational Mapping (ORM) library, to simplify database operations and model management.

- **Database:** Powered by **MySQL** for structured data storage of users, assets, and assignments.

- **Authentication:** Secured using **JSON Web Token (JWT)** for role-based access control (Admin and Employee) and secure API communication.

---

## 🧩 Features  

✅ Admin Login & Authentication  
✅ Add, Edit, Delete, and View Assets  
✅ Assign and Unassign Assets to Employees  
✅ Manage Users (Admin & Employee)  
✅ Employee Dashboard for viewing assigned assets  
✅ Status Management — *Available*, *Assigned*, *Maintenance*  
✅ Database relationships with Foreign Keys  

---

## 🗄️ Database Setup  

Create your MySQL database using the script below 👇  

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS itams_db;
USE itams_db;

-- Users table
CREATE TABLE IF NOT EXISTS Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Make sure to store hashed passwords
  role ENUM('Admin','Employee') DEFAULT 'Employee',
  department VARCHAR(100),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Assets table
CREATE TABLE IF NOT EXISTS Assets (
  asset_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(100),
  category VARCHAR(100),
  serial_number VARCHAR(100) UNIQUE,
  purchase_date DATE,
  warranty_end DATE,
  status ENUM('Available','Assigned','Maintenance') DEFAULT 'Available',
  assigned_to INT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES Users(user_id) ON DELETE SET NULL
);

-- Assignments table (tracks assignment history)
CREATE TABLE IF NOT EXISTS Assignments (
  assignment_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  asset_id INT NOT NULL,
  assigned_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  returned_date DATETIME NULL, 
  status ENUM('Assigned','Returned') DEFAULT 'Assigned',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (asset_id) REFERENCES Assets(asset_id) ON DELETE CASCADE
);

-- Indexes for performance (optional)
CREATE INDEX idx_assets_assigned_to ON Assets(assigned_to);
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_assets_serial_number ON Assets(serial_number);
```

### 🔧 Configuration
Database Connection — backend/config/db.js

```const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'itams_db'
});

module.exports = pool.promise();
```

---

## 🚀 How to Run Locally
### Step 1: Clone the Repository
```git clone https://github.com/your-username/IT-Asset-Management.git 
cd IT-Asset-Management
```
### Step 2: Install Backend Dependencies
```cd backend
npm install
```
### Step 3: Set Up MySQL Database
Run the SQL script (given above) in **MySQL Workbench** or **phpMyAdmin.**

### Step 4: Run the Server

```node server.js ```
or
```npm start ```

The backend will run on http://localhost:5000

### Step 5: Open the Frontend
Open ```frontend/html/index.html ``` in your browser (or use VS Code Live Server).

---

## 👩‍💻 Author
### Jaya Chithra N
Full Stack Developer | MERN Enthusiast

---

## Screenshots
