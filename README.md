# Forever — Frontend

A React storefront and admin panel for Forever, a full-stack e-commerce platform.

## Features

- Consumer storefront with product browsing, cart, wishlist, and checkout
- Authentication and protected routes for customers and admins
- Admin panel with product and order management
- Paginated and filterable admin views with URL-synced filter state
- Responsive layouts across mobile and desktop
- Loading, error, and empty states across data-driven views

## Tech Stack

- React
- Redux Toolkit / RTK Query
- React Router
- Tailwind CSS
- Vite

## Architecture

```text
React UI → RTK Query → Backend API
```

API calls are organized through a shared `baseApi` with feature-scoped `injectEndpoints` slices.

Admin filter state is separated into draft and active states and synchronized with the URL. Filters can be adjusted before being applied, while the active filter state remains shareable and bookmarkable through the URL.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/himanshu-mawari/ecommerce-frontend.git
cd ecommerce-frontend
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:2006
```

### Running Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Related Repository

Backend: [ecommerce-backend](https://github.com/himanshu-mawari/ecommerce-backend)
