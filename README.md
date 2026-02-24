# Bruno Vehicle Hire

A full-stack vehicle management system built with Clean Architecture (.NET 10) and React (TypeScript). Built as part of an intermediate-level technical assessment.

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| .NET 10 Web API | RESTful API |
| Entity Framework Core | ORM (Code-First, SQLite) |
| MediatR | CQRS pattern |
| FluentValidation | Request validation |
| xUnit + NSubstitute | Unit testing |
| Swashbuckle | Swagger API docs |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | SPA framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| React Router v6 | Client-side routing |
| Lucide React | Icons |

---

## Project Structure

```
BrunoVehicleHire/
├── src/
│   ├── BrunoVehicleHire.Domain/          # Entities, interfaces — no dependencies
│   ├── BrunoVehicleHire.Application/     # CQRS commands, queries, validators
│   ├── BrunoVehicleHire.Infrastructure/  # EF Core, repositories, migrations
│   └── BrunoVehicleHire.API/             # Controllers, middleware, Program.cs
├── tests/
│   └── BrunoVehicleHire.Application.Tests/
└── client/                               # React frontend
```

---

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [EF Core CLI tools](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

```bash
dotnet tool install --global dotnet-ef
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd BrunoVehicleHire
```

### 2. Configure the backend

Create `src/BrunoVehicleHire.API/appsettings.Development.json`:

```json
{
  "ApiKey": "your-api-key",
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=brunovehiclehire.db"
  }
}
```

> `appsettings.Development.json` is gitignored. Never commit real secrets.

### 3. Run the backend

```bash
dotnet run --project src/BrunoVehicleHire.API
```

The API starts at `http://localhost:5008`. Migrations and seed data are applied automatically on startup.

Swagger UI is available at:
```
http://localhost:5008/swagger
```

### 4. Configure the frontend

```bash
cd client
cp .env.example .env.development
```

Edit `.env.development`:
```
VITE_API_URL=http://localhost:5008/api
VITE_API_KEY=your-api-key
```

### 5. Run the frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Running Tests

```bash
dotnet test
```

---

## API Endpoints

All endpoints require the `X-API-Key` header.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/vehicles` | Get paginated vehicles |
| `GET` | `/api/vehicles/deleted` | Get soft-deleted vehicles |
| `GET` | `/api/vehicles/{registrationNumber}` | Get vehicle by registration |
| `POST` | `/api/vehicles` | Create a vehicle |
| `PUT` | `/api/vehicles/{id}` | Update a vehicle |
| `DELETE` | `/api/vehicles/{id}` | Soft delete a vehicle |

### Query Parameters (GET /api/vehicles)

| Parameter | Type | Default | Description |
|---|---|---|---|
| `pageNumber` | int | 1 | Page number |
| `pageSize` | int | 10 | Results per page |
| `searchTerm` | string | "" | Search by registration, make or model |

### Example Request

```bash
curl -X GET "http://localhost:5008/api/vehicles?pageNumber=1&pageSize=10" \
  -H "X-API-Key: your-api-key"
```

### Example Response

```json
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "registrationNumber": "CA 123-456",
      "make": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "createdDate": "2024-01-15T10:30:00Z",
      "deletedDate": null
    }
  ],
  "totalCount": 15,
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 2,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

---

## Architecture

This project follows **Clean Architecture** with strict dependency rules:

```
Domain ← Application ← Infrastructure
                ↑
               API
```

- **Domain** — pure C#, zero dependencies. Entities and repository interfaces live here.
- **Application** — business logic via CQRS (MediatR). No database code.
- **Infrastructure** — EF Core, SQLite, repository implementations. Depends on Domain.
- **API** — thin controllers that route requests to MediatR. No business logic.

### Key Patterns

**CQRS** — Commands modify state, Queries read state. Each is handled by a dedicated class.

**Soft Delete** — vehicles are never removed from the database. `IsDeleted = true` is set on delete. A global EF Core query filter (`HasQueryFilter`) automatically excludes deleted records from all queries.

**Validation** — FluentValidation runs before every command via a MediatR pipeline behaviour. Invalid requests never reach the handler.

**API Key Auth** — custom middleware checks the `X-API-Key` header on every request before it reaches any controller.

---

## Database

Uses **SQLite** for simplicity. Switching to SQL Server is a one-line change in `DependencyInjection.cs`:

```csharp
// SQLite (default)
options.UseSqlite(connectionString)

// SQL Server
options.UseSqlServer(connectionString)
```

Migrations are applied automatically on startup via `db.Database.Migrate()`.

To run migrations manually:
```bash
dotnet ef migrations add <MigrationName> \
  --project src/BrunoVehicleHire.Infrastructure \
  --startup-project src/BrunoVehicleHire.API

dotnet ef database update \
  --project src/BrunoVehicleHire.Infrastructure \
  --startup-project src/BrunoVehicleHire.API
```

---

## Seed Data

In development, the database is seeded with 15 active vehicles and 3 soft-deleted vehicles on every startup. To disable seeding, remove the `DataSeeder.SeedAsync(db)` call from `Program.cs`.

---

## Environment Variables

### Backend (`appsettings.Development.json`)

| Key | Description |
|---|---|
| `ApiKey` | Secret key required in `X-API-Key` header |
| `ConnectionStrings:DefaultConnection` | SQLite connection string |

### Frontend (`.env.development`)

| Key | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |
| `VITE_API_KEY` | Must match backend `ApiKey` |
