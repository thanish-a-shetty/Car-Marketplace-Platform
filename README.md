# Car Marketplace Platform

A full-stack web application for buying and selling cars, built with modern web technologies.

## 🚀 Features

- **Car Listings**: Browse and search through new and used cars
- **Car Comparison**: Compare multiple cars side-by-side
- **EMI Calculator**: Calculate monthly installments for car purchases
- **User Authentication**: Secure login and registration system
- **Sell Car**: Upload and manage your car listings
- **Responsive Design**: Optimized for desktop and mobile devices
- **Image Upload**: Support for multiple car images
- **User Profiles**: Manage your listings and preferences

## 🛠️ Technologies Used

- **Frontend**: Next.js, React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, NextAuth.js
- **File Upload**: Multer for image handling
- **Version Control**: Git

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/car-marketplace-platform.git
   cd car-marketplace-platform
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. **Run the application**

   **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

   **Start the frontend development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000` to view the application.

## 📁 Project Structure

```
UIUX/
├── app/                    # Next.js frontend application
│   ├── components/         # React components
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── cars/              # Car listing pages
│   ├── compare/           # Car comparison pages
│   ├── emi-calculator/    # EMI calculator
│   ├── sell-car/          # Sell car functionality
│   └── used-cars/         # Used cars section
├── backend/               # Node.js/Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── uploads/           # File uploads directory
└── public/                # Static assets
```

## 🔧 Available Scripts

### Frontend (Next.js)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend (Node.js)
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (if configured)

## 🌟 Key Features Explained

### Car Comparison
- Side-by-side comparison of multiple cars
- Detailed specifications comparison
- Price and feature analysis

### EMI Calculator
- Calculate monthly installments
- Different loan terms and interest rates
- Down payment options

### User Authentication
- Secure login and registration
- JWT token-based authentication
- Protected routes and API endpoints

### Image Upload
- Multiple image upload support
- Image optimization and storage
- Secure file handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database solution
- All contributors and supporters

---

**Note**: This is a demonstration project. For production use, ensure proper security measures, environment variables, and deployment configurations are in place. 