# Git Commit Guide for GoMate

This document outlines the feature-based commit structure used in this project.

## Commit History (Recommended)

### Initial Setup

```bash
git commit -m "feat: initialize Expo project with TypeScript"
```

### Dependencies

```bash
git commit -m "feat: install navigation and state management dependencies

- Add @react-navigation/native and related packages
- Add @reduxjs/toolkit and react-redux
- Add @react-native-async-storage/async-storage
- Add axios for API calls
- Add yup for form validation
- Add @expo/vector-icons for Feather icons"
```

### Redux Store Setup

```bash
git commit -m "feat: configure Redux store with slices

- Create authSlice for user authentication state
- Create favoritesSlice for managing favorite routes
- Create themeSlice for dark mode state
- Add TypeScript types for all slices
- Configure AsyncStorage persistence"
```

### Services

```bash
git commit -m "feat: implement API services

- Create base Axios configuration with interceptors
- Implement authService for login/register
- Implement transportService for fetching routes
- Add token management in AsyncStorage
- Transform DummyJSON products into transport routes"
```

### Authentication UI

```bash
git commit -m "feat: implement user authentication screens

- Create LoginScreen with form validation
- Create RegisterScreen with comprehensive validation
- Add password visibility toggle
- Implement Yup validation schemas
- Add demo credentials display
- Style with Feather icons and responsive design"
```

### Navigation Structure

```bash
git commit -m "feat: setup navigation architecture

- Create AppNavigator with stack navigation
- Implement BottomTabNavigator for main sections
- Add protected routes based on auth state
- Implement session restoration on app load
- Configure navigation types with TypeScript"
```

### Home Screen

```bash
git commit -m "feat: create Home screen with route listing

- Fetch and display transport routes from API
- Implement card-based UI with images
- Add search functionality
- Implement pull-to-refresh
- Add favorite toggle functionality
- Display route details (type, duration, price)
- Add status badges (Popular, Active, Upcoming)"
```

### Details Screen

```bash
git commit -m "feat: implement route Details screen

- Display comprehensive route information
- Show departure/arrival times
- Add amenities section
- Implement favorite toggle
- Add booking button UI
- Create responsive layout with image header"
```

### Favorites Feature

```bash
git commit -m "feat: implement Favorites functionality

- Create FavoritesScreen to display saved routes
- Add toggle favorite action in Redux
- Persist favorites using AsyncStorage
- Add empty state with proper messaging
- Implement remove from favorites"
```

### Profile Screen

```bash
git commit -m "feat: create user Profile screen

- Display user information with avatar
- Show statistics (favorites, trips, reviews)
- Add settings menu
- Implement logout with confirmation
- Add account management options"
```

### Dark Mode

```bash
git commit -m "feat: implement dark mode toggle

- Add theme toggle in Profile screen
- Apply dark mode styles across all screens
- Persist theme preference in AsyncStorage
- Update navigation components for dark mode
- Ensure proper contrast and readability"
```

### Styling & Polish

```bash
git commit -m "style: enhance UI/UX across all screens

- Apply consistent color scheme
- Add responsive layouts
- Implement smooth transitions
- Add loading states and indicators
- Improve spacing and typography
- Add Feather icons throughout"
```

### Documentation

```bash
git commit -m "docs: add comprehensive README and documentation

- Document all features and technologies
- Add setup instructions
- Include API documentation
- Add demo credentials
- Create project structure overview
- Document security best practices"
```

## Commit Message Conventions

### Format

```
<type>: <subject>

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

#### Feature Commit

```bash
git commit -m "feat: add search functionality to Home screen

- Implement search input in header
- Filter routes by title, description, and type
- Add clear search button
- Update filtered results in real-time"
```

#### Bug Fix Commit

```bash
git commit -m "fix: resolve favorite persistence issue

- Ensure favorites save to AsyncStorage on toggle
- Load favorites on app initialization
- Fix duplicate entries in favorites list"
```

#### Documentation Commit

```bash
git commit -m "docs: update README with API integration details"
```

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Clear Messages**: Write descriptive commit messages
3. **One Feature**: One commit per feature
4. **Test Before Commit**: Ensure code works before committing
5. **Logical Order**: Commit in a logical development sequence

## Branching Strategy

```bash
# Feature branches
git checkout -b feature/user-authentication
git checkout -b feature/favorites
git checkout -b feature/dark-mode

# Bug fix branches
git checkout -b fix/navigation-issue

# Release branches
git checkout -b release/v1.0.0
```

## Example Workflow

```bash
# 1. Create feature branch
git checkout -b feature/profile-screen

# 2. Make changes
# ... develop profile screen ...

# 3. Stage changes
git add screens/ProfileScreen.tsx

# 4. Commit with clear message
git commit -m "feat: create user Profile screen

- Display user information with avatar
- Show statistics
- Add settings menu
- Implement logout"

# 5. Push to remote
git push origin feature/profile-screen

# 6. Create pull request
# ... on GitHub/GitLab ...

# 7. Merge to main after review
git checkout main
git merge feature/profile-screen
```

## Commit Checklist

Before committing, ensure:

- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] Follows project coding standards
- [ ] Commit message is clear and descriptive
- [ ] Related files are staged
- [ ] No sensitive data (API keys, passwords)
- [ ] Feature is tested and working

---

Following these guidelines ensures a clean, understandable git history that makes collaboration and debugging easier.
