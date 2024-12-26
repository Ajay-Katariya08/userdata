import { lazy, Suspense } from "react";
const UserDataTable = lazy(() => import('./UserDataTable'));

const UsersPage = () => {

  return (
    <div className="container p-6 mx-auto mt-8">

      <Suspense fallback={<div />}>
        <UserDataTable />
      </Suspense>

    </div>
  );
};

export default UsersPage;
