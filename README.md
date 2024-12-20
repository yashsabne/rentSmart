 

---

# **🌟 RentSmart**  
_Simplifying property rentals and sales with an intuitive, feature-rich platform._

---

## 📋 **Table of Contents**
- [Project Overview](#-project-overview)
- [🚀 Features](#-features)
- [🛠️ Technologies Used](#%EF%B8%8F-technologies-used)
- [📋 Prerequisites](#-prerequisites)
- [📥 Installation](#-installation)
- [⚙️ Setup](#%EF%B8%8F-setup)
- [▶️ Usage](#%EF%B8%8F-usage)
- [📂 Project Structure](#-project-structure)
- [📈 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📬 Contact](#-contact)

---

## 🎯 **Project Overview**  
RentSmart is a **MERN-stack web application** that streamlines the process of renting and buying properties.  
Whether you're a property owner or a seeker, RentSmart offers tools to make your experience **efficient** and **reliable**.  
With features like **real-time chat**, **secure payments**, and a sleek **dark theme**, RentSmart stands out with its intuitive design and robust performance.  

---

## 🚀 **Features**
### 🔑 **Core Features**
1. **Property Listings** 🏠  
   - Browse properties with advanced search filters.  
   - View detailed property info, including images, pricing plans, and descriptions.

2. **User Authentication** 🔒  
   - Secure login with JWT.  
   - Google OAuth for easy social login.  

3. **User Dashboard** 📊  
   - Manage your profile, properties, and saved items.  
   - View activity logs and settings in a polished UI.  

4. **Payment Integration** 💳  
   - Multiple payment plans (monthly, yearly, etc.) via Razorpay.  
   - Hassle-free and secure transactions.  

5. **Real-Time Chat** 💬 (Under Development)  
   - Chat with property owners and clients via Socket.IO.  

6. **Responsive Design** 📱  
   - Optimized for desktop, tablet, and mobile screens.  

7. **Dark Mode** 🌙  
   - Modern dark theme for an elegant and comfortable experience.  

---

## 🛠️ **Technologies Used**
| **Category**         | **Technology**                   |
|-----------------------|----------------------------------|
| Frontend             | React, HTML, CSS, JavaScript    |
| Backend              | Node.js, Express.js             |
| Database             | MongoDB, Mongoose               |
| Real-Time Communication | Socket.IO                     |
| Authentication       | JWT, Passport.js (Google OAuth) |
| Payments             | Razorpay                        |
| File Storage         | Multer, Multer-GridFS-Storage   |
| Styling              | CSS, Custom Animations          |

---

## 📋 **Prerequisites**
Ensure you have the following installed:  
- **Node.js** (v14+)  
- **MongoDB** (Atlas or local instance)  
- **NPM** or **Yarn**  
- **Git**  

---

## 📥 **Installation**
1. **Clone the Repository** 🛠️  
   ```bash
   git clone https://github.com/your-username/rentsmart.git
   cd rentsmart
   ```

2. **Install Dependencies**:  
   - **Frontend**:  
     ```bash
     cd client
     npm install
     ```
   - **Backend**:  
     ```bash
     cd server
     npm install
     ```

---

## ⚙️ **Setup**
### 🛠️ Configure Environment Variables  
Create a `.env` file in the `server` directory with the following:  
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=3001
```

### 🌐 Update API Endpoints  
- In the `client/src` directory, update the API URLs to match your backend server.

---

## ▶️ **Usage**
1. **Run the Backend** 🖥️  
   ```bash
   cd server
   npm start
   ```
   The backend will be available at `http://localhost:3001`.

2. **Run the Frontend** 🌐  
   ```bash
   cd client
   npm start
   ```
   The frontend will be accessible at `http://localhost:3000`.

---

## 📂 **Project Structure**
```plaintext
rentsmart/
├── client/                # React frontend
│   ├── public/            # Public assets
│   ├── src/               # Source code
├── server/                # Express backend
│   ├── config/            # Configurations
│   ├── controllers/       # Route handlers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
├── .gitignore             # Ignored files
├── README.md              # Documentation
```

---

## 📈 **Future Enhancements**
1. Advanced property filtering based on amenities, neighborhood, etc.  
2. Admin panel for managing users, payments, and properties.  
3. Email notifications for user activities and payment confirmations.  
4. Analytics dashboard for property owners to track engagement.  

---

## 🤝 **Contributing**
We welcome contributions!  
1. **Fork the Repo** 🍴  
2. Create a branch:  
   ```bash
   git checkout -b feature/YourFeature
   ```  
3. Commit changes:  
   ```bash
   git commit -m "Add YourFeature"
   ```  
4. Push changes:  
   ```bash
   git push origin feature/YourFeature
   ```  
5. Submit a Pull Request 🚀  

---

## 📬 **Contact**
If you have questions, feel free to reach out:  
- **👤 Name**: Yash Navnath Sabne  
- **📧 Email**: yashsabne39@gmail.com  
- **🔗 LinkedIn**: [Yash Sabne](https://www.linkedin.com/in/yash-sabne-77239b287)  

---

  
