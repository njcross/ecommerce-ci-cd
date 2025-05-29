
# 🛒 Ecommerce React + Firebase App

A full-stack e-commerce application built with React, Redux, Firebase, and React Query. Users can browse products, add to cart, check out, and view order history.

---

## 🚀 Features

- View, add, edit, and delete products.
- Add products to a shopping cart with quantity management.
- Checkout and create orders in Firestore.
- View past orders with timestamps.
- Firebase Authentication for user management.
- React Query for data fetching and caching.
- Redux Toolkit for cart and auth state management.
- TypeScript for type safety.
- CI/CD with GitHub Actions and Vercel.

---

## 🧪 Testing Strategy

### ✅ Unit Tests

- Tests are written using **Jest** and **React Testing Library**.
- Includes component rendering, state updates, and user interactions.

```bash
npm test
```

### ✅ Integration Tests

- Simulates adding a product to the cart.
- Asserts resulting state changes in the Redux store.

---

## 🔄 CI: Continuous Integration

GitHub Actions run on each push to `main` and pull requests:

- Defined in `.github/workflows/main.yml`
- Runs tests using Jest
- Blocks merge if tests fail

---

## 🚀 CD: Continuous Deployment

Deployment to Vercel is triggered only after passing CI tests.

- Secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) must be set in GitHub repository.
- Workflow defined in `.github/workflows/deploy.yml`

---

## 📂 Folder Structure

```
src/
  components/        # UI Components like Home and Cart
  store/             # Redux slices for cart and auth
  api/               # Product API calls
  firebaseConfig.ts  # Firebase initialization
  types.ts           # TypeScript types
__tests__/           # Unit and integration test files
.github/workflows/   # CI/CD workflow YAMLs
```

---

## 🔧 Scripts

```bash
npm install       # Install dependencies
npm run dev       # Start Vite development server
npm test          # Run Jest tests
```

---

## 🛠 Technologies

- React + Vite
- TypeScript
- Redux Toolkit
- React Query
- Firebase (Auth, Firestore)
- GitHub Actions
- Jest & RTL

---

## 🧪 TDD & CI/CD Summary

### ✅ Test-Driven Development

- **Unit Tests**: Components tested independently
- **Integration Test**: Cart updates on adding product

### ⚙️ CI/CD

- **CI**: Automated test runs on pushes/PRs
- **CD**: Deployment to Vercel after passing tests
