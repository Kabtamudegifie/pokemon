# 📱 Pokemon App

A modern **React Native + Expo (SDK 54)** application built with performance, scalability, and clean architecture.

This project demonstrates a **production-ready setup** using:

- ⚡ Expo Router (file-based navigation)
- 🎨 NativeWind (Tailwind CSS for React Native)
- 🧠 React Query (data fetching & caching)
- 🧩 Modular folder structure (`src/` based)
- 🚀 EAS Build + OTA Updates
- 📦 Yarn Workspaces ready

---

# 🚀 Tech Stack

- Expo SDK 54
- React Native 0.81
- React 19
- Expo Router
- NativeWind
- React Native Paper
- TanStack React Query
- FlashList

---

# 📁 Project Structure

```
.
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── data/
│   ├── hooks/
│   ├── libs/
│   ├── providers/
│   └── utils/
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
git clone https://github.com/kabtamu-degifie/pokemon.git
cd pokemon
```

## 2. Install dependencies

```bash
yarn install
```

## 3. Start the app

```bash
yarn start
```

Run on device:

```bash
yarn android
yarn ios
```

---

# 🧪 Development

```bash
yarn dev
```

---

# 🏗️ Build & Deployment (EAS)

## Login

```bash
npx expo login
```

## Development build

```bash
yarn eas build --profile development --platform android
```

## Staging build

```bash
yarn eas build --profile staging --platform android
```

## Production build

```bash
yarn eas build --profile production --platform android
```

---

# 🔄 OTA Updates

```bash
yarn eas update --channel staging
yarn eas update --channel production
```

---

# 🌍 Environments

| Environment | Package                |
| ----------- | ---------------------- |
| Dev         | com.kd.pokemon.dev     |
| Staging     | com.kd.pokemon.staging |
| Prod        | com.kd.pokemon         |

---

# 👨‍💻 Author

Kabtamu D

---

# 📄 License

None
