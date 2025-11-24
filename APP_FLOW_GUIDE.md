# App Flow & Screen Guide - GoMate

## 🗺️ Navigation Flow

```
App Launch
    ↓
Check Authentication
    ↓
    ├─── Not Authenticated ──→ Login Screen
    │                              ↓
    │                         [Register] ──→ Register Screen
    │                              ↓            ↓
    │                         [Login Success] ←┘
    │                              ↓
    └─── Authenticated ──────────→ Home Screen (Tab 1)
                                    ↓
                            Bottom Tab Navigator
                            ┌──────┴──────┬──────────┐
                            ↓             ↓          ↓
                        Home Screen  Favorites  Profile Screen
                            ↓
                        [Tap Route]
                            ↓
                        Details Screen
```

## 📱 Screen Descriptions

### 1. Login Screen

**Route**: `Login` (Auth Stack)

**Purpose**: User authentication entry point

**Features**:

- Username input field
- Password input field with visibility toggle
- Form validation
- Demo credentials display
- Link to Register screen
- Loading indicator during login

**Actions**:

- Login → Navigate to Home
- Register Link → Navigate to Register

---

### 2. Register Screen

**Route**: `Register` (Auth Stack)

**Purpose**: New user account creation

**Features**:

- First name input
- Last name input
- Username input
- Email input
- Password input with strength validation
- Confirm password input
- Form validation with real-time errors
- Back button to Login

**Actions**:

- Register → Auto-login → Navigate to Home
- Back → Navigate to Login

---

### 3. Home Screen

**Route**: `Home` (Tab Navigator - Tab 1)

**Purpose**: Browse available transport routes

**Features**:

- User greeting with first name
- Search bar for filtering routes
- List of route cards:
  - Route image
  - Route title
  - Description
  - Status badge (Popular/Active/Upcoming)
  - Transport type
  - Duration
  - Price
  - Favorite heart icon
- Pull-to-refresh
- Loading state
- Empty state

**Actions**:

- Tap Route → Navigate to Details
- Tap Heart → Toggle Favorite
- Search → Filter routes
- Pull Down → Refresh data

---

### 4. Details Screen

**Route**: `Details` (Stack - Modal)

**Purpose**: Show comprehensive route information

**Features**:

- Large route image header
- Back button overlay
- Favorite toggle overlay
- Route title and status
- Route information card:
  - Transport type
  - Duration
  - Departure time
  - Arrival time
- Full description
- Amenities section (WiFi, Refreshments, etc.)
- Price display
- Book Now button

**Actions**:

- Back Button → Navigate to Home/Favorites
- Tap Heart → Toggle Favorite
- Book Now → (UI ready for implementation)

---

### 5. Favorites Screen

**Route**: `Favorites` (Tab Navigator - Tab 2)

**Purpose**: View and manage saved routes

**Features**:

- Header showing favorites count
- List of favorited routes (same card design as Home)
- Filled heart icons
- Empty state when no favorites

**Actions**:

- Tap Route → Navigate to Details
- Tap Heart → Remove from Favorites

---

### 6. Profile Screen

**Route**: `Profile` (Tab Navigator - Tab 3)

**Purpose**: User profile and app settings

**Features**:

- User avatar with initials
- Full name display
- Username display
- Email display
- Statistics:
  - Favorites count
  - Trips count
  - Reviews count
- Preferences section:
  - Dark mode toggle
  - Notifications (UI ready)
  - Language selector (UI ready)
- Account section:
  - Edit profile (UI ready)
  - Change password (UI ready)
  - Privacy & security (UI ready)
- Support section:
  - Help center (UI ready)
  - About (UI ready)
- Logout button

**Actions**:

- Dark Mode Toggle → Change theme
- Logout → Confirmation → Navigate to Login

---

## 🎨 UI Components Breakdown

### Common Elements

#### Route Card

```
┌─────────────────────────────────┐
│ [Image - 180px height]          │
│                                  │
├─────────────────────────────────┤
│ Title                    [Heart] │
│ [Status Badge]                   │
│                                  │
│ Description (2 lines)            │
│                                  │
│ [Type Icon] Bus                  │
│ [Clock Icon] 1h 30m              │
│ [Dollar Icon] $549               │
└─────────────────────────────────┘
```

#### Form Input

```
┌─────────────────────────────────┐
│ [Icon] Input Text      [Toggle] │
└─────────────────────────────────┘
  Error message here
```

#### Status Badge

```
┌──────────┐
│ Popular  │ ← Green background
└──────────┘

┌──────────┐
│ Active   │ ← Blue background
└──────────┘

┌──────────┐
│ Upcoming │ ← Orange background
└──────────┘
```

### Tab Bar Icons

```
┌─────────────────────────────────┐
│ [Home]  [Heart]  [User]         │
│  Home   Favorites Profile       │
└─────────────────────────────────┘
```

## 🎯 User Journeys

### Journey 1: First Time User

```
1. App Launch → Login Screen
2. Tap "Register" → Register Screen
3. Fill form → Tap "Register"
4. Auto-navigate → Home Screen
5. Browse routes → Tap a route
6. View details → Tap heart to favorite
7. Navigate to Favorites tab → See saved route
8. Navigate to Profile → Toggle dark mode
9. Tap Logout → Return to Login
```

### Journey 2: Returning User

```
1. App Launch → Auto-login → Home Screen
2. Pull down to refresh → Updated routes
3. Use search → Filter routes
4. Tap route → Details Screen
5. Add to favorites → Return
6. Check Favorites tab → View all saved
7. Continue browsing
```

### Journey 3: Exploring Routes

```
1. Home Screen → See 20 routes
2. Scroll through list
3. Tap route 1 → View details → Back
4. Tap route 2 → View details → Add to favorites → Back
5. Tap route 3 → View details → Back
6. Switch to Favorites → See route 2
7. Remove from favorites
```

## 🔄 State Changes

### Authentication State

```
Initial: isLoading = true
After Check: isLoading = false, isAuthenticated = false
After Login: isAuthenticated = true, user = {...}
After Logout: isAuthenticated = false, user = null
```

### Favorites State

```
Initial: items = []
Add Favorite: items = [...items, newItem]
Remove Favorite: items = items.filter(item => item.id !== id)
Toggle Favorite: add if not exists, remove if exists
```

### Theme State

```
Initial: isDarkMode = false
Toggle: isDarkMode = !isDarkMode
Persists to AsyncStorage
```

## 📊 Data Flow

### Login Flow

```
User Input → Validation → API Call → Response
                ↓                      ↓
           Yup Schema            Success/Error
                ↓                      ↓
          Valid/Invalid          Store Token
                ↓                      ↓
         Show Errors           Update Redux
                                       ↓
                                Navigate Home
```

### Fetch Routes Flow

```
Home Screen Mount → API Call → DummyJSON
        ↓                           ↓
   Loading State              Get Products
        ↓                           ↓
   Show Spinner              Transform Data
        ↓                           ↓
   Receive Data               Return Routes
        ↓                           ↓
   Update State               Display Cards
```

### Favorite Toggle Flow

```
Tap Heart → Get Current State → Check if Favorited
    ↓                                    ↓
Dispatch        ├─── Yes → Remove from list
Action          └─── No  → Add to list
    ↓                                    ↓
Update          Update Redux State ←─────┘
Redux                   ↓
    ↓           Save to AsyncStorage
    ↓                   ↓
Update UI       Persist Favorites
```

## 🎨 Color Scheme

### Light Mode

- **Background**: #F2F2F7
- **Card**: #FFFFFF
- **Text**: #000000
- **Secondary Text**: #666666
- **Accent**: #007AFF
- **Success**: #34C759
- **Error**: #FF3B30
- **Warning**: #FF9500

### Dark Mode

- **Background**: #000000
- **Card**: #1C1C1E
- **Text**: #FFFFFF
- **Secondary Text**: #999999
- **Accent**: #007AFF
- **Success**: #34C759
- **Error**: #FF3B30
- **Warning**: #FF9500

## 📏 Spacing System

- **Extra Small**: 4px
- **Small**: 8px
- **Medium**: 12px
- **Large**: 16px
- **Extra Large**: 20px
- **XXL**: 24px

## 🔤 Typography

- **Title**: 32px, Bold
- **Heading**: 24px, Bold
- **Subheading**: 18px, Semi-Bold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular
- **Small**: 12px, Regular

---

This guide provides a complete overview of the app's structure, flow, and design system. Use it as a reference when navigating or modifying the application.
