# E-commerce App with CI/CD

A fully functional e-commerce web application built with React, Redux Toolkit, React Query, and Firebase. This project simulates a real online store using the [FakeStoreAPI](https://fakestoreapi.com/) and demonstrates advanced concepts such as API integration, state management, and session persistence. The project implements Continuous Integration and Continuous Deployment using GitHub Actions and Vercel.

## 🔗 Live Demo

🌐 [Visit the App](https://ecommerce-ci-cd.vercel.app/)

## 🚀 Features

- Product listing and details
- Shopping cart with quantity adjustments
- User authentication (Login/Register)
- Order checkout and Firestore integration
- Jest unit and integration tests
- CI/CD with GitHub Actions and Vercel

## 🧪 Testing

Tests are written using **React Testing Library** and **Jest**. Run tests with:

```bash
npm test
```

## ⚙️ CI/CD Pipeline

- GitHub Actions for CI (build and test on push to `main`)
- Deploys to Vercel only if CI passes

## 📁 Project Structure

```
src/
├── api/                # API helpers
├── components/         # Reusable components
├── pages/              # Page components
├── store/              # Redux store and slices
├── __tests__/          # Unit and integration tests
└── firebaseConfig.ts   # Firebase setup
```

## 📄 License

This project is licensed under the MIT License.
