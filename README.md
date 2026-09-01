# ATLAS — Country Explorer

A responsive country-exploration application built with React. Users can browse paginated country data, change the page size, sort countries, search by name, and view detailed country information.

## Live Demo

[Open Country Explorer](https://country-explorer-livid.vercel.app)

## Features

- API-level country pagination
- Configurable page sizes: 10, 20 or 30
- Country sorting from A–Z and Z–A
- Direct country-name search
- Detailed country information
- Loading, empty and error states
- Retry functionality for failed requests
- Request cancellation with `AbortController`
- API-response normalization
- Responsive desktop and mobile interface
- Accessible buttons, forms and focus states
- Reduced-motion accessibility support
- Automatic deployment from GitHub through Vercel

## Technology Stack

- React
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Fetch API
- ESLint
- Prettier
- Git and GitHub
- Vercel

## Project Architecture

The application separates interface, state management and API communication into different layers:

```text
User interaction
        ↓
Dashboard.jsx
        ↓
useCountries.js
        ↓
countriesApi.js
        ↓
countries.dev API
        ↓
Normalized country data
        ↓
React components
```

### Dashboard

`Dashboard.jsx` coordinates application-level actions and state, including:

- Current page
- Page size
- Sorting
- Selected country
- Country search
- Search loading and errors

### Custom Hook

`useCountries.js` manages asynchronous list state:

- Country records
- Pagination information
- Loading state
- API errors
- Retry functionality
- Request cancellation

### API Service

`countriesApi.js` owns API-specific logic:

- URL construction
- Query parameters
- HTTP requests
- Response validation
- Error conversion
- Country-data normalization
- Pagination calculations
- Country-name search

This separation keeps UI components independent from the external API’s raw response format.

## API-Level Pagination

The application does not download every country and paginate the complete collection in the browser.

It sends `limit` and `offset` query parameters to the API:

```js
const offset = (page - 1) * pageSize;
const requestLimit = pageSize + 1;
```

Examples:

| Page | Page size | Offset | Requested | Displayed |
| ---: | --------: | -----: | --------: | --------: |
|    1 |        10 |      0 |        11 |        10 |
|    2 |        10 |     10 |        11 |        10 |
|    3 |        20 |     40 |        21 |        20 |

One extra country is requested to determine whether another page exists:

```js
const hasNextPage = data.length > pageSize;
```

The extra record is removed before displaying the page:

```js
const items = normalizedCountries.slice(0, pageSize);
```

## Request Cancellation

Each list request uses an `AbortController`.

When the page, page size or sorting changes, the previous unfinished request is cancelled before a new request begins. Search requests use a separate controller so outdated search results cannot replace the latest result.

## Error Handling

The API service distinguishes between:

- Network failures
- HTTP response errors
- Country-not-found responses
- Invalid JSON responses
- Intentional request cancellation

The interface provides appropriate loading, error and retry states without crashing the application.

## Project Structure

```text
src/
├── components/
│   ├── CountryCard.jsx
│   ├── CountryDetail.jsx
│   ├── CountryList.jsx
│   ├── Dashboard.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── ResponsiveAppBar.jsx
│   └── WorldMap.jsx
├── hooks/
│   └── useCountries.js
├── services/
│   └── countriesApi.js
├── App.jsx
├── index.css
└── main.jsx
```

## Local Installation

Clone the repository:

```bash
git clone https://github.com/nnadianaz/country-explorer.git
```

Enter the project directory:

```bash
cd country-explorer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Commands

| Command           | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Starts the Vite development server           |
| `npm run format`  | Formats the source code with Prettier        |
| `npm run lint`    | Checks JavaScript and React code with ESLint |
| `npm run build`   | Creates the production build                 |
| `npm run preview` | Previews the production build locally        |

## Planned Improvements

- URL-synchronized pagination and sorting
- Debounced country search
- Favourite countries
- Country comparison
- Interactive world map
- Automated component and API tests
- TypeScript migration
- Node.js and Express backend
- PostgreSQL database
- User authentication
- Persistent user favourites

## Learning Outcomes

This project demonstrates practical understanding of:

- React components, props and state
- Controlled form inputs
- State lifting
- Custom hooks
- Effects and dependency arrays
- Cleanup functions
- API-level pagination
- Asynchronous JavaScript
- Error handling
- Request cancellation
- Data normalization
- Responsive design
- Git feature branches and pull requests
- Production deployment
