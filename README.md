# 📱 Pokemon App

A modern **React Native + Expo (SDK 54)** application built with a focus on performance, scalability, and clean architecture.

This project demonstrates a **production-ready mobile setup** with best practices for development, state management, and deployment.

---

# 🚀 Tech Stack

- Expo SDK 54
- React Native 0.81
- React 19
- Expo Router (file-based navigation)
- NativeWind (Tailwind CSS for React Native)
- React Native Paper
- TanStack React Query (data fetching & caching)
- FlashList (high-performance lists)

---

# ✨ Features

- ⚡ File-based navigation with Expo Router
- 🎨 Utility-first styling using NativeWind
- 🧠 Efficient server-state management with React Query
- 📦 Scalable `src/`-based architecture
- 🚀 EAS Build for CI/CD
- 🔄 OTA updates with EAS Update
- 📱 Optimized performance using FlashList

---

# 📁 Project Structure

```
.
├── src/
│   ├── app/          # Screens (Expo Router)
│   ├── components/   # Reusable UI components
│   ├── constants/    # App constants
│   ├── data/         # Static/mock data
│   ├── hooks/        # Custom hooks
│   ├── libs/         # External integrations
│   ├── providers/    # Context providers
│   └── utils/        # Utility functions
│
├── assets/
├── app.config.ts
├── eas.json
├── metro.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Kabtamudegifie/pokemon.git
cd pokemon
```

## 2. Install dependencies

```bash
yarn install
```

## 3. Start the development server

```bash
yarn start
```

---

# 📱 Running the App

### Android

```bash
yarn android
```

### iOS

```bash
yarn ios
```

> Ensure you have an emulator running or a physical device connected.

---

# 🧪 Development

### Start with clean cache

```bash
yarn dev
```

### Lint the project

```bash
yarn lint
```

### Type checking

```bash
yarn typecheck
```

---

# 🏗️ Build & Deployment (EAS)

## Login

```bash
npx expo login
```

---

## 📦 Android Builds

### Development

```bash
yarn build:android:dev
```

### Staging

```bash
yarn build:android:staging
```

### Production

```bash
yarn build:android:prod
```

---

## 🍏 iOS Builds

### Development

```bash
yarn build:ios:dev
```

### Staging

```bash
yarn build:ios:staging
```

### Production

```bash
yarn build:ios:prod
```

---

# 🔄 OTA Updates

### Staging

```bash
yarn update:staging
```

### Production

```bash
yarn update:prod
```

---

# 🚀 Preview Production Bundle

Run the app in a production-like mode:

```bash
yarn preview
```

---

# 🌍 Environments

| Environment | Package                |
| ----------- | ---------------------- |
| Dev         | com.kd.pokemon.dev     |
| Staging     | com.kd.pokemon.staging |
| Prod        | com.kd.pokemon         |

---

# 🧠 Architecture Notes

- Modular structure using `src/` for scalability
- Separation of concerns (UI, logic, data)
- React Query handles async state and caching
- Designed for easy extension and team collaboration

---

# 👨‍💻 Author

**Kabtamu D**

---

# 📄 License

This project is not licensed.
