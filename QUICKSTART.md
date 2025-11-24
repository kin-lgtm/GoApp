# Quick Start Guide - GoMate

## 🚀 Running the App

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the Development Server

```bash
npx expo start
```

or

```bash
npm start
```

### Step 3: Run the App

#### Option A: Physical Device (Recommended for Best Experience)

1. Install **Expo Go** app on your phone:

   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code:
   - **Android**: Open Expo Go and scan the QR code
   - **iOS**: Open Camera app and scan the QR code

#### Option B: Android Emulator

```bash
npm run android
```

Prerequisites: Android Studio with emulator set up

#### Option C: iOS Simulator (Mac only)

```bash
npm run ios
```

Prerequisites: Xcode installed

## 🔐 Test Login

Use these credentials to test the app:

**Username**: `emilys`  
**Password**: `emilyspass`

Or create a new account by clicking "Register"

## 📱 Features to Test

### 1. Authentication

- [ ] Register a new account
- [ ] Login with demo credentials
- [ ] Test form validations (try invalid inputs)
- [ ] Verify session persists after app restart

### 2. Home Screen

- [ ] View list of transport routes
- [ ] Search for routes (try typing "bus" or "train")
- [ ] Pull down to refresh
- [ ] Tap a route to view details
- [ ] Add routes to favorites (heart icon)

### 3. Route Details

- [ ] View full route information
- [ ] Check departure/arrival times
- [ ] View amenities
- [ ] Toggle favorite status
- [ ] Navigate back to home

### 4. Favorites

- [ ] Go to Favorites tab
- [ ] View saved routes
- [ ] Remove from favorites
- [ ] Verify empty state when no favorites

### 5. Profile

- [ ] View user information
- [ ] Toggle dark mode on/off
- [ ] View statistics
- [ ] Logout and login again

### 6. Dark Mode

- [ ] Enable dark mode in Profile
- [ ] Navigate through all screens
- [ ] Verify colors and contrast
- [ ] Disable dark mode

## 🛠️ Troubleshooting

### Issue: Dependencies not installing

**Solution**:

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Issue: Expo won't start

**Solution**:

```bash
npx expo start -c
```

(The `-c` flag clears the cache)

### Issue: Can't connect to Metro bundler

**Solution**:

- Make sure your phone and computer are on the same WiFi network
- Try restarting the Expo server
- Use tunnel mode: `npx expo start --tunnel`

### Issue: App crashes on startup

**Solution**:

- Clear Expo Go app cache on your device
- Restart the development server
- Check console for error messages

### Issue: TypeScript errors

**Solution**:

```bash
npm install --save-dev @types/react @types/react-native
```

## 📦 Project Structure Overview

```
GoMate/
├── app/
│   └── _layout.tsx          # Main app entry with Redux Provider
├── navigation/
│   ├── AppNavigator.tsx     # Auth & main navigation
│   └── BottomTabNavigator.tsx # Tab navigation
├── screens/
│   ├── LoginScreen.tsx      # Login page
│   ├── RegisterScreen.tsx   # Registration page
│   ├── HomeScreen.tsx       # Routes list
│   ├── DetailsScreen.tsx    # Route details
│   ├── FavoritesScreen.tsx  # Saved favorites
│   └── ProfileScreen.tsx    # User profile
├── store/
│   ├── index.ts            # Redux store
│   └── slices/             # State slices
├── services/
│   ├── api.ts              # Axios setup
│   ├── authService.ts      # Auth API
│   └── transportService.ts # Routes API
└── utils/
    └── validation.ts       # Form validation
```

## 🔧 Development Commands

```bash
# Start development server
npm start

# Start with cache clear
npx expo start -c

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web (experimental)
npm run web

# Type check
npx tsc --noEmit

# Install new package
npm install <package-name>
```

## 💡 Tips

1. **Use Expo Go for fastest development**

   - Instant refresh on code changes
   - No need to rebuild app

2. **Enable Fast Refresh**

   - Automatically enabled
   - See changes instantly

3. **Debug with React DevTools**

   ```bash
   npx react-devtools
   ```

4. **Check Redux State**

   - Install Redux DevTools extension
   - View state changes in real-time

5. **Network Debugging**
   - Check Metro bundler console for API calls
   - Use React Native Debugger for network inspection

## 📖 Next Steps

After running the app:

1. **Explore the codebase**

   - Check out the Redux slices
   - Review the navigation structure
   - Look at the form validations

2. **Customize the app**

   - Change colors in constants/theme.ts
   - Modify API endpoints
   - Add new features

3. **Read the documentation**
   - See README.md for full documentation
   - Check FEATURES.md for implementation details
   - Review COMMIT_GUIDE.md for development workflow

## ❓ Need Help?

- Check console logs for errors
- Review error messages in the app
- Verify all dependencies are installed
- Ensure Expo CLI is up to date: `npm install -g expo-cli`

---

Happy coding! 🎉
