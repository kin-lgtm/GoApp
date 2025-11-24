# API Documentation - GoMate

## Overview

GoMate uses **DummyJSON** (https://dummyjson.com) as the backend API for authentication and data. The app transforms product data into transport routes for demonstration purposes.

## Base Configuration

### API Client Setup

**File**: `services/api.ts`

```typescript
const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### Request Interceptor

Automatically adds authentication token to all requests:

```typescript
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Authentication API

### Login

**Endpoint**: `POST /auth/login`  
**Service**: `authService.login(credentials)`

**Request**:

```typescript
{
  username: string;
  password: string;
}
```

**Response**:

```typescript
{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}
```

**Example**:

```typescript
const response = await authService.login({
  username: "emilys",
  password: "emilyspass",
});
```

**Demo Credentials**:

- Username: `emilys`
- Password: `emilyspass`

### Register

**Endpoint**: `POST /users/add`  
**Service**: `authService.register(data)`

**Request**:

```typescript
{
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
```

**Response**:

```typescript
{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
```

**Note**: DummyJSON doesn't persist new users, so after registration, the app attempts to log in with the default credentials.

### Get Current User

**Endpoint**: `GET /auth/me`  
**Service**: `authService.getCurrentUser()`

**Headers**:

```
Authorization: Bearer <token>
```

**Response**:

```typescript
{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
```

## Transport Routes API

### Get All Routes

**Endpoint**: `GET /products?limit=20`  
**Service**: `transportService.getRoutes()`

**Response**: Array of products transformed into transport routes

**Transformation Logic**:

```typescript
{
  id: product.id.toString(),
  title: `${transportType} to ${product.title}`,
  description: product.description,
  image: product.thumbnail,
  status: getStatus(product.rating), // Popular/Active/Upcoming
  type: getTransportType(index),     // Bus/Train/Metro/Ferry/Tram
  departure: getDepartureTime(index),
  arrival: getArrivalTime(index),
  duration: getDuration(index),
  price: product.price,
}
```

**Status Mapping**:

- Rating >= 4.5 → "Popular"
- Rating >= 4.0 → "Active"
- Rating < 4.0 → "Upcoming"

**Transport Types** (rotating based on index):

- Bus
- Train
- Metro
- Ferry
- Tram

**Example Response**:

```json
[
  {
    "id": "1",
    "title": "Bus to iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "image": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "status": "Popular",
    "type": "Bus",
    "departure": "08:00",
    "arrival": "09:30",
    "duration": "1h 30m",
    "price": 549
  }
]
```

### Get Route by ID

**Endpoint**: `GET /products/{id}`  
**Service**: `transportService.getRouteById(id)`

**Parameters**:

- `id` (string): Route ID

**Response**: Single transport route object

**Example**:

```typescript
const route = await transportService.getRouteById("1");
```

## Data Transformation

### Helper Functions

#### getTransportType

```typescript
const getTransportType = (index: number): string => {
  const types = ["Bus", "Train", "Metro", "Ferry", "Tram"];
  return types[index % types.length];
};
```

#### getStatus

```typescript
const getStatus = (rating: number): string => {
  if (rating >= 4.5) return "Popular";
  if (rating >= 4.0) return "Active";
  return "Upcoming";
};
```

#### getDepartureTime

```typescript
const getDepartureTime = (index: number): string => {
  const hour = 8 + (index % 12);
  return `${hour.toString().padStart(2, "0")}:00`;
};
```

#### getArrivalTime

```typescript
const getArrivalTime = (index: number): string => {
  const hour = 9 + (index % 12);
  return `${hour.toString().padStart(2, "0")}:30`;
};
```

#### getDuration

```typescript
const getDuration = (index: number): string => {
  const minutes = 30 + (index % 5) * 15;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};
```

## Error Handling

### Network Errors

```typescript
try {
  const routes = await transportService.getRoutes();
} catch (error) {
  console.error("Error fetching routes:", error);
  // Handle error (show message to user)
}
```

### Authentication Errors

```typescript
try {
  await authService.login({ username, password });
} catch (error: any) {
  if (error.response?.status === 401) {
    Alert.alert("Error", "Invalid credentials");
  } else {
    Alert.alert("Error", "Login failed. Please try again.");
  }
}
```

## Security Considerations

### Token Storage

```typescript
// Store token securely
await AsyncStorage.setItem("authToken", token);

// Retrieve token
const token = await AsyncStorage.getItem("authToken");

// Remove token on logout
await AsyncStorage.removeItem("authToken");
```

### Best Practices

1. ✅ Tokens stored in AsyncStorage (not in Redux)
2. ✅ HTTPS used for all API calls
3. ✅ Tokens automatically included in requests
4. ✅ Tokens cleared on logout
5. ✅ Sensitive data never logged to console

## API Limitations

### DummyJSON Constraints

1. **Registration**: New users are not persisted
2. **Authentication**: Only test accounts work
3. **Data Modification**: Changes don't persist
4. **Rate Limiting**: May apply to excessive requests

### Workarounds Implemented

1. After registration, auto-login with demo credentials
2. Transform product data into transport routes
3. Local state management for favorites
4. AsyncStorage for persistence

## Future API Integration

To use a real Transport API:

1. **Update Base URL**

   ```typescript
   // services/api.ts
   const api = axios.create({
     baseURL: "https://api.transportapi.com", // or your API
   });
   ```

2. **Update Endpoints**

   ```typescript
   // services/transportService.ts
   getRoutes: async () => {
     const response = await api.get("/routes");
     return response.data;
   };
   ```

3. **Remove Transformations**

   - Use real route data directly
   - Remove helper functions
   - Update TransportItem interface

4. **Add API Key**
   ```typescript
   api.interceptors.request.use((config) => {
     config.headers["X-API-Key"] = process.env.TRANSPORT_API_KEY;
     return config;
   });
   ```

## API Testing

### Using Postman

1. **Login Request**

   ```
   POST https://dummyjson.com/auth/login
   Body: {
     "username": "emilys",
     "password": "emilyspass"
   }
   ```

2. **Get Routes**

   ```
   GET https://dummyjson.com/products?limit=20
   ```

3. **Get Route by ID**
   ```
   GET https://dummyjson.com/products/1
   ```

### Using curl

```bash
# Login
curl -X POST https://dummyjson.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"emilys","password":"emilyspass"}'

# Get Routes
curl https://dummyjson.com/products?limit=20

# Get Route by ID
curl https://dummyjson.com/products/1
```

## Environment Variables

For production, use environment variables:

```env
# .env
API_BASE_URL=https://dummyjson.com
API_TIMEOUT=10000
```

Load in code:

```typescript
import Constants from "expo-constants";

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiBaseUrl || "https://dummyjson.com",
});
```

## API Response Caching

Consider implementing caching for better performance:

```typescript
// Simple in-memory cache
const cache = new Map();

const getCachedRoutes = async () => {
  if (cache.has("routes")) {
    return cache.get("routes");
  }

  const routes = await transportService.getRoutes();
  cache.set("routes", routes);
  return routes;
};
```

## Monitoring & Logging

### Request Logging

```typescript
api.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});
```

### Response Logging

```typescript
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response:`, response.status);
    return response;
  },
  (error) => {
    console.error(`[API] Error:`, error.message);
    return Promise.reject(error);
  }
);
```

---

## Summary

- ✅ RESTful API integration with DummyJSON
- ✅ Secure token-based authentication
- ✅ Automatic token injection via interceptors
- ✅ Data transformation for transport routes
- ✅ Comprehensive error handling
- ✅ AsyncStorage for persistence
- ✅ Easy to migrate to real Transport API

For questions or issues, refer to the main README.md or check the DummyJSON documentation at https://dummyjson.com/docs
