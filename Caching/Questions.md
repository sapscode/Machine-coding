Fetch data using useEffect without refetching on every render

Prevent duplicate API calls between two components

Cache an API response in memory

Invalidate cached data after a POST request

Implement stale-while-revalidate behavior

Prefetch data on hover or route change

Handle loading, error, and success states cleanly

Avoid flickering loaders with cached data

Fetch data conditionally

Explain how React Query does caching internally (conceptually)

src/
│
├── api/
│   └── usersApi.js        // Q2, Q3, Q4, Q5, Q6, Q10
│
├── hooks/
│   └── useUsers.js        // Q1, Q7, Q8, Q9
│
├── components/
│   ├── UsersList.jsx     // usage
│   └── AddUser.jsx       // POST usage
│
└── App.jsx               // where everything is called
