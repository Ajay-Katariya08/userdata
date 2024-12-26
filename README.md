This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Challenges Faced:
-------------------------------------
(1) TanStack Table Version Compatibility:

   TanStack Table is evolving rapidly, and in the process, certain hooks and utilities have changed. Initially, I had issues with missing or deprecated APIs, especially with global filters (getGlobalFilterRowModel), which were no longer part of the latest version of the library.

   Solution: I adapted to the new hooks (useGlobalFilter, useFilters) provided by TanStack Table to ensure that both global and column-based filtering worked as expected.

 (2) UI Handling:

    While fetching the data using TanStack Query, I had to ensure that the table displayed loading states and error messages correctly.

    Solution: Conditional rendering was used to display a loading indicator or error message based on the state returned by the query hook.
    Pagination and Filtering Synchronization:



