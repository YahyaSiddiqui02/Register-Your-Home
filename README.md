# Register Your Home

A full-stack real estate web application for renting, buying, and selling properties. Users can browse listings, post properties, manage their inventory, and connect with buyers and sellers.

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Token-based authentication

## Project Structure

```
register-your-home/
├── register-your-home-backend/     # Express API (port 5000)
│   ├── src/
│   │   ├── app.js                  # Express app setup
│   │   ├── server.js               # Server entry point
│   │   ├── config/                 # Configuration (Prisma client)
│   │   ├── controllers/            # Request handlers
│   │   ├── routes/                 # API routes
│   │   ├── middleware/             # Auth, error handling
│   │   └── utils/                  # Helper functions
│   ├── prisma/
│   │   ├── schema.prisma           # Database schema
│   │   ├── seed.js                 # Sample data
│   │   └── migrations/             # Database migrations
│   ├── .env.example                # Environment variables template
│   └── package.json
│
└── register-your-home/             # React frontend (port 5173)
    ├── src/
    │   ├── components/             # Reusable React components
    │   ├── pages/                  # Page components
    │   ├── data/                   # Mock/static data
    │   └── App.jsx                 # Main app component
    ├── index.html                  # HTML entry point
    ├── vite.config.js              # Vite configuration
    ├── .env.example                # Environment variables template
    └── package.json
```

## Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v15+)
- npm

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd register-your-home-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   # Then edit .env with your PostgreSQL credentials
   ```

4. **Set up database:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Start the backend:**
   ```bash
   npm run dev
   ```
   The API will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder (in another terminal):**
   ```bash
   cd register-your-home
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Properties
- `GET /api/properties` - List all properties (public)
- `GET /api/properties/:id` - Get property details (public)
- `GET /api/properties/mine` - Get user's properties (protected)
- `POST /api/properties` - Create property (protected, OWNER/ADMIN)
- `PUT /api/properties/:id` - Update property (protected, owner only)
- `DELETE /api/properties/:id` - Delete property (protected, owner only)

### Health
- `GET /api/health` - Server status check

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/register_your_home
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## Features

- User authentication with JWT tokens
- Property listing with filters (type, location, price)
- Property details view
- Create, update, delete listings (for owners)
- User roles: Buyer/Tenant, Owner, Liaison, Admin
- Responsive design with Tailwind CSS

## License

ISC
