# GoMate - Quick Reference Card

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 🔐 Demo Login

**Username**: `emilys`  
**Password**: `emilyspass`

## 📁 Key Files

| Purpose      | File Location                 |
| ------------ | ----------------------------- |
| Main Entry   | `app/_layout.tsx`             |
| Navigation   | `navigation/AppNavigator.tsx` |
| Redux Store  | `store/index.ts`              |
| Auth Slice   | `store/slices/authSlice.ts`   |
| API Config   | `services/api.ts`             |
| Login Screen | `screens/LoginScreen.tsx`     |
| Home Screen  | `screens/HomeScreen.tsx`      |

## 🎯 Main Features

✅ User Authentication (Login/Register)  
✅ Transport Routes Listing  
✅ Route Details View  
✅ Favorites Management  
✅ User Profile  
✅ Dark Mode Toggle  
✅ Search & Filter  
✅ Pull to Refresh

## 📱 App Structure

```
Auth Flow → Login/Register
    ↓
Main App → Bottom Tabs:
  - Home (Browse routes)
  - Favorites (Saved routes)
  - Profile (User settings)
    ↓
Details → Route information
```

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **State**: Redux Toolkit
- **Navigation**: React Navigation
- **API**: Axios + DummyJSON
- **Storage**: AsyncStorage
- **Validation**: Yup
- **Icons**: Feather Icons

## 🎨 Design System

### Colors (Light Mode)

- Primary: `#007AFF`
- Background: `#F2F2F7`
- Card: `#FFFFFF`
- Text: `#000000`

### Colors (Dark Mode)

- Primary: `#007AFF`
- Background: `#000000`
- Card: `#1C1C1E`
- Text: `#FFFFFF`

## 🔧 Redux Slices

| Slice            | Purpose   | Key Actions                                 |
| ---------------- | --------- | ------------------------------------------- |
| `authSlice`      | User auth | setUser, logout, restoreSession             |
| `favoritesSlice` | Favorites | addFavorite, removeFavorite, toggleFavorite |
| `themeSlice`     | Dark mode | toggleTheme, setTheme                       |

## 🌐 API Endpoints

| Action     | Endpoint             | Method |
| ---------- | -------------------- | ------ |
| Login      | `/auth/login`        | POST   |
| Register   | `/users/add`         | POST   |
| Get Routes | `/products?limit=20` | GET    |
| Get Route  | `/products/{id}`     | GET    |

## 📊 Project Stats

- **Screens**: 6
- **Redux Slices**: 3
- **API Services**: 2
- **Documentation**: 6 files
- **Total Features**: 33+

## 🔍 Troubleshooting

### Can't connect to Metro

```bash
npx expo start -c
```

### Dependencies issue

```bash
rm -rf node_modules
npm install
```

### TypeScript errors

Check for missing imports and type definitions

## 📚 Documentation Files

1. **README.md** - Main documentation
2. **QUICKSTART.md** - Getting started
3. **FEATURES.md** - Feature checklist
4. **API_DOCUMENTATION.md** - API guide
5. **COMMIT_GUIDE.md** - Git workflow
6. **APP_FLOW_GUIDE.md** - Screen flows
7. **PROJECT_SUMMARY.md** - Project overview

## 🎓 Learning Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Navigation](https://reactnavigation.org)

## ✅ Pre-Launch Checklist

- [x] All features implemented
- [x] No TypeScript errors
- [x] No runtime errors
- [x] Authentication working
- [x] API integration complete
- [x] Dark mode functional
- [x] Documentation complete
- [x] Ready to demo

## 📞 Quick Help

**Setup Issues**: See QUICKSTART.md  
**Feature Details**: See FEATURES.md  
**API Problems**: See API_DOCUMENTATION.md  
**Git Workflow**: See COMMIT_GUIDE.md

---

**GoMate v1.0.0** - Your Travel Companion  
Built with React Native, TypeScript & ❤️
