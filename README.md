# GoMate - Travel & Transport App

A comprehensive React Native mobile application for exploring public transport schedules and destinations, built with Expo, TypeScript, Redux Toolkit, and React Navigation.

## 📱 Features

### ✅ User Authentication

- User registration with comprehensive validation using Yup
- Secure login flow with token-based authentication
- Password visibility toggle
- Session persistence using AsyncStorage
- Auto-restore session on app launch
- User profile display with name/username visible in header

### ✅ Navigation

- Stack Navigation for authentication flow
- Bottom Tab Navigation for main app sections (Home, Favorites, Profile)
- Smooth transitions between screens
- Protected routes (authentication required)

### ✅ Home Screen

- Dynamic list of transport routes fetched from DummyJSON API
- Beautiful card-based UI with:
  - Route images
  - Title and description
  - Status badges (Popular, Active, Upcoming)
  - Transport type, duration, and price
- Search functionality to filter routes
- Pull-to-refresh capability
- Tap on items to view detailed information

### ✅ Details Screen

- Comprehensive route information
- Route type, duration, departure/arrival times
- Full description
- Amenities display (WiFi, Refreshments, etc.)
- Add/remove from favorites
- Booking button (UI ready)
- Beautiful image header with overlay controls

### ✅ Favorites Management

- Add/remove routes from favorites with heart icon
- Dedicated Favorites screen
- Persistent storage using AsyncStorage
- Redux state management for real-time updates
- Visual feedback with filled/unfilled heart icons

### ✅ Profile Screen

- User information display (avatar, name, username, email)
- Statistics (favorites count, trips, reviews)
- Dark mode toggle
- Settings menu (notifications, language, etc.)
- Account management options
- Logout functionality with confirmation

### ✅ Dark Mode

- Complete dark mode support across all screens
- Theme toggle in Profile screen
- Persistent theme preference
- Smooth transitions between themes
- Proper color contrast for readability

### ✅ State Management

- Redux Toolkit for centralized state management
- Separate slices for:
  - Authentication (user, login state)
  - Favorites (saved routes)
  - Theme (dark mode preference)
- TypeScript-safe hooks (useAppDispatch, useAppSelector)

### ✅ Styling & UI

- Clean, modern design with iOS-inspired aesthetics
- Feather Icons used throughout the app
- Responsive layouts for various screen sizes
- Consistent color scheme and spacing
- Smooth animations and transitions
- Professional card-based layouts
- Status badges with color coding

## 🛠️ Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Navigation** - Navigation library
- **Axios** - HTTP client for API calls
- **Yup** - Form validation
- **AsyncStorage** - Local data persistence
- **Feather Icons** - Icon library
- **DummyJSON** - Mock API for authentication and data

## 📁 Project Structure

```
GoMate/
├── app/
│   └── _layout.tsx           # Root layout with Redux Provider
├── navigation/
│   ├── AppNavigator.tsx      # Main navigation container
│   └── BottomTabNavigator.tsx # Bottom tab navigation
├── screens/
│   ├── LoginScreen.tsx       # User login
│   ├── RegisterScreen.tsx    # User registration
│   ├── HomeScreen.tsx        # Transport routes list
│   ├── DetailsScreen.tsx     # Route details
│   ├── FavoritesScreen.tsx   # Saved favorites
│   └── ProfileScreen.tsx     # User profile & settings
├── store/
│   ├── index.ts             # Redux store configuration
│   └── slices/
│       ├── authSlice.ts     # Authentication state
│       ├── favoritesSlice.ts # Favorites state
│       └── themeSlice.ts    # Theme state
├── services/
│   ├── api.ts               # Axios configuration
│   ├── authService.ts       # Authentication API
│   └── transportService.ts  # Transport data API
├── hooks/
│   └── redux-hooks.ts       # Typed Redux hooks
├── utils/
│   └── validation.ts        # Yup validation schemas
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd GoMate
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your device:
   - Scan the QR code with Expo Go (Android)
   - Scan the QR code with Camera app (iOS)

Or run on emulator:

```bash
npm run android  # For Android
npm run ios      # For iOS
```

## 🔐 Demo Credentials

To test the app, use these credentials from DummyJSON:

- **Username**: `emilys`
- **Password**: `emilyspass`

## 📚 API Integration

The app uses two APIs:

1. **DummyJSON** (https://dummyjson.com)

   - User authentication
   - Product data (transformed into transport routes)

2. **Transform Logic**
   - Products are converted into transport routes
   - Dynamic generation of departure/arrival times
   - Random transport types (Bus, Train, Metro, Ferry, Tram)
   - Status based on product ratings

## 🔒 Security Best Practices

- Authentication tokens stored securely in AsyncStorage
- Passwords validated with strong requirements
- Tokens included in API request headers via interceptors
- Sensitive data cleared on logout
- Input validation on both client and server side

## 📝 Code Quality

- **Feature-based commits**: Each feature committed separately
- **Proper validations**: Yup schemas for all forms
- **Decoupled code**: Separate concerns (UI, logic, state)
- **Reusable components**: Modular component design
- **TypeScript**: Full type safety throughout the app
- **Industry standards**: Following React Native best practices

## 🎨 Design Features

- iOS-inspired design language
- Consistent spacing and typography
- Color-coded status badges
- Smooth transitions and animations
- Responsive layouts
- Dark mode support
- Accessible UI elements

## 🧪 Testing the App

1. **Login Flow**:

   - Use demo credentials or register a new account
   - Form validation ensures proper input
   - Session persists after app restart

2. **Browse Routes**:

   - Scroll through transport routes
   - Use search to filter routes
   - Pull down to refresh data

3. **Route Details**:

   - Tap any route to view details
   - Add/remove from favorites
   - View comprehensive route information

4. **Favorites**:

   - Navigate to Favorites tab
   - View all saved routes
   - Remove from favorites with heart icon

5. **Profile**:
   - View user information
   - Toggle dark mode
   - Access settings
   - Logout

## 🔄 State Persistence

The following data persists across app sessions:

- User authentication state
- Favorite routes
- Dark mode preference

## 📦 Dependencies

Key dependencies include:

- `@react-navigation/native` - Navigation
- `@react-navigation/stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@reduxjs/toolkit` - State management
- `react-redux` - Redux bindings
- `@react-native-async-storage/async-storage` - Local storage
- `axios` - HTTP client
- `yup` - Validation
- `@expo/vector-icons` - Icons

## 🎯 Bonus Features Implemented

✅ Dark mode toggle with persistence
✅ Search functionality
✅ Pull-to-refresh
✅ Loading states
✅ Error handling
✅ Beautiful animations
✅ Professional UI/UX

## 👨‍💻 Development

### Project Setup

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

### Building for Production

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React Native and Expo
