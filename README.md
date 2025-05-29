
# 🛒 Ecommerce App with Firebase

A fully functional e-commerce web application built with React, Redux Toolkit, React Query, and Firebase. This project simulates a real online store using the [FakeStoreAPI](https://fakestoreapi.com/) and demonstrates advanced concepts such as API integration, state management, and session persistence.

## 🚀 Features

- Product Catalog: Browse all products fetched from FakeStoreAPI.
- Product Management: Admin users can create, update, and delete products.
- Shopping Cart: Add products to the cart with quantity management and session persistence.
- User Authentication: Firebase Authentication with email/password support.
- Order Management: Checkout process with order history stored in Firebase Firestore.
- Responsive Design: Mobile-friendly and responsive UI.

## 🛠️ Technologies Used

- React
- Redux Toolkit
- React Query
- Firebase (Authentication & Firestore)
- TypeScript
- Vite
- Bootstrap

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/njcross/ecomerce-firebase.git
   cd ecomerce-firebase
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password) and **Firestore Database**.
   - Obtain your Firebase configuration and create a `.env` file in the root directory:

     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173/`.

## 📁 Project Structure

```
ecomerce-firebase/
├── public/
├── src/
│   ├── api/               # API calls to FakeStoreAPI
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components (Home, Cart, Orders, etc.)
│   ├── store/             # Redux slices and store configuration
│   ├── types/             # TypeScript type definitions
│   ├── firebaseConfig.ts  # Firebase configuration
│   └── main.tsx           # Application entry point
├── .env                   # Environment variables
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🧪 Testing

To run tests (if available), use:

```bash
npm test
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

For more information, visit the [GitHub repository](https://github.com/njcross/ecomerce-firebase).

---

To download the project as a ZIP file, you can use the following link:

[Download ZIP](https://github.com/njcross/ecomerce-firebase/archive/refs/heads/main.zip)
