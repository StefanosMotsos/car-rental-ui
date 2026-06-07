# Motsos Car Rentals — Frontend

**Live App:** [https://motsos-car-rentals.vercel.app/](https://motsos-car-rentals.vercel.app/)

**Backend API:** [https://car-rental-api-elm2.onrender.com](https://car-rental-api-elm2.onrender.com)

---

## Overview

Motsos Car Rentals is a full-stack car rental management application. This repository contains the React frontend, deployed on Vercel. It communicates with a REST API hosted on Render.

The app supports three user roles — **Customer**, **Employee**, and **Admin** — each with their own set of pages and access controls enforced both on the frontend (route guards) and on the backend (JWT claims).

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | ^19.2.6 | UI framework |
| TypeScript | ~6.0.2 | Type safety across the entire codebase |
| Vite | ^8.0.12 | Build tool and dev server with HMR |
| Tailwind CSS | ^4.3.0 | Utility-first styling |
| shadcn/ui | ^4.10.0 | Pre-built accessible component library |
| Radix UI | ^1.4.3 | Unstyled primitive components (dialogs, dropdowns, etc.) |
| React Router | ^7.16.0 | Client-side routing with nested layouts |
| React Hook Form | ^7.77.0 | Performant form state management |
| Zod | ^4.4.3 | Schema definition and runtime validation |
| @hookform/resolvers | ^5.4.0 | Connects Zod schemas to React Hook Form |
| Axios | ^1.17.0 | HTTP client for all API calls |
| JWT Decode | ^4.0.0 | Decodes JWT tokens on the client to read user claims |
| js-cookie | ^3.0.8 | Cookie read/write for storing the access token |
| Lucide React | ^1.17.0 | Icon set |
| React Icons | ^5.6.0 | Additional icon set |
| Inter (variable font) | ^5.2.8 | Primary typeface via @fontsource-variable |
| class-variance-authority | ^0.7.1 | Variant-based className builder for components |
| clsx | ^2.1.1 | Conditional className utility |
| tailwind-merge | ^3.6.0 | Merges conflicting Tailwind classes safely |
| tw-animate-css | ^1.4.0 | CSS animation utilities for Tailwind |

### Dev Dependencies

| Tool | Version | Purpose |
|---|---|---|
| @vitejs/plugin-react | ^6.0.1 | Vite plugin for React (Oxc transform) |
| ESLint | ^10.3.0 | Linter |
| typescript-eslint | ^8.59.2 | TypeScript-aware ESLint rules |
| eslint-plugin-react-hooks | ^7.1.1 | Enforces Rules of Hooks |
| eslint-plugin-react-refresh | ^0.5.2 | Ensures components are safe for Vite HMR |
| @types/react | ^19.2.14 | React type definitions |
| @types/react-dom | ^19.2.3 | React DOM type definitions |
| @types/js-cookie | ^3.0.6 | js-cookie type definitions |
| @types/node | ^24.12.3 | Node.js type definitions |
| globals | ^17.6.0 | Global variable definitions for ESLint |

---

## Package Files

### `package.json`

Defines the project name (`car-rental-ui`), version, module type (`"type": "module"`), all runtime dependencies, and all dev dependencies. Also defines the four npm scripts:

```json
"scripts": {
  "dev":     "vite",
  "build":   "tsc -b && vite build",
  "lint":    "eslint .",
  "preview": "vite preview"
}
```

- `dev` — starts the Vite development server with HMR at `http://localhost:5173`
- `build` — runs a TypeScript type-check (`tsc -b`) then bundles for production
- `lint` — runs ESLint across the entire project
- `preview` — serves the production build locally for final checks

### `package-lock.json`

Auto-generated lockfile managed by npm. Locks every transitive dependency to an exact version and integrity hash to ensure reproducible installs across machines and CI. **Do not edit manually.** Always commit this file alongside `package.json`.

---

## Project Structure

```
car-rental-ui/
├── public/                     # Static assets served as-is
├── src/
│   ├── main.tsx                # App entry point — mounts React, wraps with BrowserRouter + AuthProvider
│   ├── App.tsx                 # Route tree definition
│   ├── index.css               # Global styles and Tailwind base imports
│   │
│   ├── api/                    # All Axios API call functions
│   │   ├── auth.ts             # login, registerCustomer, registerEmployee
│   │   ├── vehicle.ts          # addVehicle, addPhoto, getVehicle, getVehicles, updateVehicle, deleteVehicle
│   │   ├── rental.ts           # createRental, getRentals, getRentalHistory, updateRental
│   │   ├── user.ts             # getCustomer, updateCustomer, getEmployee, updateEmployee,
│   │   │                       #   deleteCustomer, deleteEmployee, getUsers, getCustomers, getEmployees
│   │   └── lookup.ts           # getCategories, getLocations
│   │
│   ├── schemas/                # Zod schemas — single source of truth for types and validation
│   │   ├── auth.ts             # Login, JWT payload, customer/employee signup & update schemas
│   │   ├── vehicle.ts          # Vehicle create/update/read, paginated vehicle, filter schemas
│   │   ├── rental.ts           # Rental create/update/read, paginated rental, filter schemas
│   │   ├── user.ts             # Customer/Employee/User read, paginated variants, management filters
│   │   └── lookup.ts           # Category and Location schemas
│   │
│   ├── context/
│   │   └── AuthProvider.tsx    # JWT auth context — decodes token from cookie on load,
│   │                           #   exposes user, isAuthenticated, loginUser, logout
│   │
│   ├── hooks/                  # Data-fetching hooks with pagination and filter state
│   │   ├── useVehicles.ts      # Fetches paginated vehicles; exposes vehicles, filters, setFilters,
│   │   │                       #   page, setPage, totalPages, isLoading, error, refetch
│   │   ├── useRentals.ts       # Fetches rentals or rental-history depending on user role;
│   │   │                       #   same pagination/filter shape as useVehicles
│   │   └── useUsers.ts         # Fetches customers/employees/users depending on activeTab;
│   │                           #   driven by a tab param so one hook covers all three lists
│   │
│   ├── components/
│   │   ├── shared/             # Layout-level components
│   │   │   ├── Layout.tsx      # Root layout — renders Header + <Outlet> + Footer
│   │   │   ├── Header.tsx      # Navigation bar with role-aware menu items
│   │   │   ├── Footer.tsx      # Site footer
│   │   │   ├── FiltersSidebar.tsx   # Collapsible sidebar containing filter controls
│   │   │   ├── SearchBar.tsx        # Text search input
│   │   │   ├── ListPagination.tsx   # Pagination controls
│   │   │   └── StatusBadge.tsx      # Coloured badge for rental/vehicle status values
│   │   │
│   │   └── ui/                 # Feature-level and primitive components
│   │       ├── ProtectedRoute.tsx   # Route wrapper — checks auth and role, redirects if unauthorised
│   │       ├── RentalForm.tsx       # Dialog form for creating a new rental
│   │       ├── RentalTable.tsx      # Table displaying a list of rentals
│   │       ├── RentalListControls.tsx  # Filter controls for the rental list
│   │       ├── VehicleCard.tsx      # Card view for a single vehicle (customer-facing)
│   │       ├── VehicleTable.tsx     # Table displaying vehicles (employee/admin-facing)
│   │       ├── VehicleListControls.tsx  # Filter controls for the vehicle list
│   │       ├── UserTable.tsx        # Table displaying users/customers/employees
│   │       ├── UserListControls.tsx # Filter controls for user management
│   │       ├── StatCard.tsx         # Summary stat card (used on dashboards)
│   │       ├── BrandIcon.tsx        # Car brand logo icon resolver
│   │       ├── DropdownItem.tsx     # Single item inside a dropdown menu
│   │       ├── FiltersRadioList.tsx # Radio button group used inside filter sidebars
│   │       ├── FiltersRangeInput.tsx # Min/max numeric range input for filters
│   │       ├── PasswordInput.tsx    # Password field with show/hide toggle
│   │       │
│   │       └── (shadcn primitives) # button, card, dialog, alert-dialog, dropdown-menu,
│   │                               # field, label, pagination, separator, spinner, table
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx          # Public home page
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx              # Login form
│   │   │   ├── RegisterCustomerPage.tsx   # Self-service customer registration
│   │   │   └── RegisterEmployeePage.tsx   # Admin-only employee registration
│   │   ├── customer/
│   │   │   ├── VehicleListPage.tsx        # Browse available vehicles, open rental form
│   │   │   ├── OwnRentalHistoryPage.tsx   # Customer's own past and active rentals
│   │   │   └── UpdateProfilePage.tsx      # Edit customer profile details
│   │   ├── employee/
│   │   │   ├── EmployeeVehicleListPage.tsx  # Full vehicle list with edit/delete actions
│   │   │   ├── RentalListPage.tsx           # All rentals with status management
│   │   │   ├── AddVehiclePage.tsx           # Form to create a new vehicle
│   │   │   └── AddPhotoPage.tsx             # Upload a photo for a vehicle by UUID
│   │   └── admin/
│   │       ├── UserManagementPage.tsx       # Tabbed view: all users / customers / employees
│   │       ├── UpdateVehiclePage.tsx        # Edit any vehicle's details and status
│   │       └── UpdateEmployeePage.tsx       # Edit any employee's profile
│   │
│   ├── lib/
│   │   └── utils.ts            # cn() helper — merges clsx + tailwind-merge
│   │
│   └── utils/
│       └── cookies.ts          # getCookie, setCookie, deleteCookie wrappers around js-cookie
│
├── eslint.config.js            # ESLint flat config with TypeScript and React rules
├── tsconfig.app.json           # TypeScript config for the app source
├── tsconfig.node.json          # TypeScript config for Vite config files
├── package.json                # Dependencies, scripts, project metadata
├── package-lock.json           # Exact dependency lockfile (committed to source control)
└── .gitignore                  # Ignores node_modules, dist, .env files, IDE folders
```

---

## Routing

All routes are nested under a shared `<Layout>` that renders the `Header`, page content via `<Outlet>`, and the `Footer`.

| Path | Component | Access |
|---|---|---|
| `/` | LandingPage | Public |
| `/login` | LoginPage | Public |
| `/register` | RegisterCustomerPage | Public |
| `/register/employee` | RegisterEmployeePage | ADMIN |
| `/customer/vehicles` | VehicleListPage | CUSTOMER |
| `/customer/rentals` | OwnRentalHistoryPage | CUSTOMER |
| `/customer/edit` | UpdateProfilePage | CUSTOMER |
| `/employee/rentals` | RentalListPage | EMPLOYEE, ADMIN |
| `/employee/vehicles` | EmployeeVehicleListPage | EMPLOYEE, ADMIN |
| `/employee/add/vehicle` | AddVehiclePage | EMPLOYEE, ADMIN |
| `/employee/add/vehicle/:uuid/photo` | AddPhotoPage | EMPLOYEE, ADMIN |
| `/admin/vehicles/:uuid/edit` | UpdateVehiclePage | ADMIN |
| `/admin/employees/:uuid/edit` | UpdateEmployeePage | ADMIN |
| `/admin/users` | UserManagementPage | ADMIN |

`ProtectedRoute` wraps any route that requires authentication. It checks `isAuthenticated` and the user's `role` against an allowed-roles list, redirecting to `/login` or `/` when the check fails.

---

## Authentication

- The backend issues a signed JWT on login.
- The token is stored in a browser cookie (`access_token`, 1-day expiry, `SameSite: Lax`).
- `AuthProvider` decodes the cookie token at app startup using `jwt-decode` to restore session state without an extra API call. If the token is expired or missing the user starts as unauthenticated.
- The decoded token exposes: `userId`, `username`, `email`, `role` (`CUSTOMER | EMPLOYEE | ADMIN`), `userUuid`, and the raw `token` string.
- All protected API calls pass the token in the `Authorization: Bearer <token>` header.
- Logout deletes the cookie and clears the context state.

---

## Zod Schemas and Types

All TypeScript types used across the app are derived from Zod schemas using `z.infer<>`. There are no separately maintained `interface` or `type` files — the schemas are the single source of truth for both runtime validation (form resolvers) and compile-time types (API function signatures, component props).

Key schemas:

- **auth.ts** — `UserLoginDTO`, `CustomerSignupDTO`, `EmployeeSignupDTO`, `UserPayload` (JWT claims), `CustomerUpdateDTO`, `EmployeeUpdateDTO`
- **vehicle.ts** — `VehicleCreateDTO`, `VehicleUpdateDTO`, `VehicleReadOnlyDTO`, `PaginatedVehicle`, `VehicleFilters`. Tier types: `Economy | Standard | Luxury | VIP`. Statuses: `Available | Rented | Maintenance`.
- **rental.ts** — `RentalCreateDTO`, `RentalUpdateDTO`, `RentalReadOnlyDTO`, `PaginatedRental`, `RentalFilters`. Statuses: `Pending | Approved | Rejected | Returned`.
- **user.ts** — `CustomerReadOnlyDTO`, `EmployeeReadOnlyDTO`, `UserReadOnlyDTO`, paginated variants, `UserManagementFilters`
- **lookup.ts** — `CategoryReadOnlyDTO`, `LocationReadOnlyDTO`

---

## API Layer (`src/api/`)

Every function in the API layer follows the same pattern:
- Calls Axios with the `VITE_API_URL` environment variable as the base URL.
- Passes the JWT as a `Bearer` token header on authenticated endpoints.
- On error, extracts a human-readable message from `error.response.data.detail` and re-throws as a standard `Error`.

| File | Endpoints covered |
|---|---|
| `auth.ts` | `POST /auth/login`, `POST /auth/register`, `POST /auth/register/employee` |
| `vehicle.ts` | `GET /vehicles/`, `GET /vehicles/:uuid`, `POST /vehicles`, `PUT /vehicles/:uuid`, `DELETE /vehicles/:uuid`, `POST /vehicles/:uuid/photo` |
| `rental.ts` | `GET /rentals/`, `GET /rentals/rental-history`, `POST /rentals`, `PATCH /rentals/:uuid` |
| `user.ts` | `GET /customers/me`, `PUT /customers/me`, `GET /customers/`, `DELETE /customers/:uuid`, `GET /employees/:uuid`, `PUT /employees/:uuid`, `GET /employees/`, `DELETE /employees/:uuid`, `GET /users/` |
| `lookup.ts` | `GET /lookup/categories`, `GET /lookup/locations` |

---

## Custom Hooks (`src/hooks/`)

Three data-fetching hooks encapsulate pagination, filter, and loading state so pages stay lean.

**`useVehicles`** — fetches paginated vehicles, re-fetches automatically when `page` or `filters` change. Exposes `vehicles`, `isLoading`, `error`, `page`, `setPage`, `totalPages`, `filters`, `setFilters`, `refetch`.

**`useRentals`** — fetches either `/rentals/rental-history` (CUSTOMER) or `/rentals/` (EMPLOYEE/ADMIN) based on the current user's role. Same pagination/filter interface as `useVehicles`.

**`useUsers`** — accepts an `activeTab` of `"customers" | "employees" | "users"` and calls the corresponding endpoint. Used by `UserManagementPage` to power its three tabs without duplicating hook logic.

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API. Set to `https://car-rental-api-elm2.onrender.com` for production. |

Create a `.env.local` file in the project root for local development:

```env
VITE_API_URL=https://car-rental-api-elm2.onrender.com
```

---

## Getting Started

```bash
npm install      # Install all dependencies from package-lock.json
npm run dev      # Start dev server at http://localhost:5173
```

```bash
npm run build    # TypeScript check + Vite production build → dist/
npm run preview  # Serve the dist/ build locally
npm run lint     # Run ESLint across all source files
```

---

## Deployment

The frontend is deployed on **Vercel**. Pushes to `main` trigger an automatic rebuild and deploy. The `VITE_API_URL` environment variable is configured in the Vercel project settings.

The backend API runs on **Render** at [https://car-rental-api-elm2.onrender.com](https://car-rental-api-elm2.onrender.com). Note that Render free-tier instances spin down after inactivity — the first request after a cold start may take 30–60 seconds.
