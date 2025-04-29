# Final Web II 
# Fullstack Application Project

This is a website-application designed to help Sumatera Jaya Abadi to consistently store customer's data by providing a user-friendly interafce and a set of well-function CRUD (Create, Read, Update, Delete) method.

# Application Technical Requirements
Technology Stack

# Backend
- Language: JavaScript (Node.js)
- Framework: Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT (jsonwebtoken)
- Password Hashing: bcryptjs

# Frontend
- Language: JavaScript
- Framework: React
- User Interaface Framework: react-bootstrap
- API Consumer: Axios

# Admin Authentication API

Endpoints for admin user authentication in the system.

## Authentication

Most endpoints require JWT token authentication via the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Register Admin
- **POST** `/admin/signup`
- **Body**: 
  ```json
  {
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "password123"  // min 6 chars
  }
  ```
- **Success**: `201 Created` 
  ```json
  {
    "message": "Successfully created new Admin",
    "user": "Admin Name"
  }
  ```
- **Errors**: 
  - `400` - Missing fields, short password, or admin exists
  - `400` - Error creating admin

### Login Admin
- **POST** `/admin/login`
- **Body**: 
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Success**: `200 OK` 
  ```json
  {
    "message": "Successfully logged in",
    "user": "Admin Name",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Errors**: 
  - `400` - Missing fields
  - `404` - Admin not found
  - `401` - Invalid credentials
  - `500` - Server error

### Logout Admin
- **POST** `/admin/logout`
- **Auth**: Required
- **Success**: `200 OK` 
  ```json
  {
    "message": "Successfully logged out"
  }
  ```
- **Errors**: 
  - `500` - Error logging out

## Notes
- JWT tokens expire after 1 hour
- Passwords are hashed using bcrypt

# SIM Management API

Endpoints for managing SIM (driving license) data in the system.

## Endpoints

### Create SIM
- **POST** `/data/sim`
- **Body**:
  ```json
  {
    "layanan": "Pembuatan SIM", // "Pembaharuan STNK" or "Pembuatan SIM"
    "nama": "John Doe",
    "alamat": "123 Main St",
    "tipe": "SIM A",
    "tahun": 2023,
    "harga": 150000
  }
  ```
- **Success**: `201 Created`
  ```json
  {
    "message": "Successfully created new Pembuatan SIM data",
    "savedSIM": { /* SIM object */ }
  }
  ```
- **Errors**:
  - `400` - Missing fields
  - `400` - Invalid layanan type
  - `400` - SIM already exists
  - `500` - Server error

### Get All SIM
- **GET** `/data/sim`
- **Success**: `200 OK`
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "layanan": "Pembuatan SIM",
      "nama": "John Doe",
      "alamat": "123 Main St",
      "tipe": "SIM A",
      "tahun": 2023,
      "harga": 150000,
      "status": "Pending",
      "createdAt": "2023-06-22T10:00:00Z",
      "updatedAt": "2023-06-22T10:00:00Z"
    }
    // ...more items
  ]
  ```
- **Errors**:
  - `500` - Error fetching SIM data

### Get SIM by ID
- **GET** `/data/sim/:id`
- **Success**: `200 OK`
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "layanan": "Pembuatan SIM",
    "nama": "John Doe",
    "alamat": "123 Main St",
    "tipe": "SIM A",
    "tahun": 2023,
    "harga": 150000,
    "status": "Pending",
    "createdAt": "2023-06-22T10:00:00Z",
    "updatedAt": "2023-06-22T10:00:00Z"
  }
  ```
- **Errors**:
  - `404` - SIM not found
  - `500` - Server error

### Update SIM
- **PUT** `/data/sim/:id`
- **Body**:
  ```json
  {
    "tipe": "SIM B1", // Optional
    "status": "Approved" // Optional
  }
  ```
- **Success**: `200 OK`
  ```json
  {
    "message": "Successfully updated SIM 60d21b4667d0d8992e610c85 data",
    "updatedSIM": { /* Updated SIM object */ }
  }
  ```
- **Errors**:
  - `400` - Invalid SIM type
  - `400` - SIM type already in use
  - `404` - SIM not found
  - `500` - Server error

### Delete SIM
- **DELETE** `/data/sim/:id`
- **Success**: `200 OK`
  ```json
  {
    "message": "SIM 60d21b4667d0d8992e610c85 deleted successfully",
    "deletedSIM": { /* Deleted SIM object */ }
  }
  ```
- **Errors**:
  - `404` - SIM not found
  - `500` - Server error

## Notes
- Valid SIM types: 'SIM A', 'SIM B1', 'SIM C'
- Valid layanan types: 'Pembaharuan STNK', 'Pembuatan SIM'
- Default status is 'Pending'

# STNK Management API

Endpoints for managing STNK (vehicle registration) data in the system.

## Endpoints

### Create STNK
- **POST** `/data/stnk`
- **Body**:
  ```json
  {
    "layanan": "Pembaharuan STNK",
    "nomor_plat": "B 1234 ABC",
    "nama": "John Doe",
    "alamat": "123 Main St",
    "merk": "Toyota",
    "tipe": "Avanza",
    "tahun": 2022,
    "harga": 200000
  }
  ```
- **Success**: `201 Created`
  ```json
  {
    "message": "Successfully created new Pembaharuan STNK data",
    "savedSTNK": { /* STNK object */ }
  }
  ```
- **Errors**:
  - `400` - Missing fields
  - `400` - Invalid layanan type
  - `400` - Nomor plat already exists
  - `500` - Server error

### Get All STNK
- **GET** `/data/stnk`
- **Success**: `200 OK`
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "nama": "John Doe",
      "alamat": "123 Main St",
      "merk": "Toyota",
      "nomor_plat": "B 1234 ABC",
      "harga": 200000,
      "status": "Pending"
    }
    // ...more items
  ]
  ```
- **Errors**:
  - `500` - Error fetching STNK data

### Get STNK by ID
- **GET** `/data/stnk/:id`
- **Success**: `200 OK`
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "layanan": "Pembaharuan STNK",
    "nomor_plat": "B 1234 ABC",
    "nama": "John Doe",
    "alamat": "123 Main St",
    "merk": "Toyota",
    "tipe": "Avanza",
    "tahun": 2022,
    "harga": 200000,
    "status": "Pending",
    "createdAt": "2023-06-22T10:00:00Z",
    "updatedAt": "2023-06-22T10:00:00Z"
  }
  ```
- **Errors**:
  - `404` - STNK not found
  - `500` - Server error

### Update STNK
- **PUT** `/data/stnk/:id`
- **Body**:
  ```json
  {
    "nomor_plat": "B 5678 XYZ", // Optional
    "status": "In Progress" // Optional
  }
  ```
- **Success**: `200 OK`
  ```json
  {
    "message": "Successfully updated STNK 60d21b4667d0d8992e610c85 data",
    "updatedSTNK": { /* Updated STNK object */ }
  }
  ```
- **Errors**:
  - `400` - No update data provided
  - `400` - Invalid status value
  - `400` - Nomor plat already exists
  - `404` - STNK not found
  - `500` - Server error

### Delete STNK
- **DELETE** `/data/stnk/:id`
- **Success**: `200 OK`
  ```json
  {
    "message": "STNK 60d21b4667d0d8992e610c85 deleted successfully",
    "deletedSTNK": { /* Deleted STNK object */ }
  }
  ```
- **Errors**:
  - `404` - STNK not found
  - `500` - Server error

## Notes
- Valid layanan type: Only 'Pembaharuan STNK'
- Valid status values: 'Pending', 'In Progress', 'Done'
- Default status is 'Pending'