"use client"
import { useSearchParams } from "next/navigation";
import UserTable from "../compnents/UserTable";

const UserDataTable = () => {
    const searchParams = useSearchParams();

    const page = searchParams.get("page");

    const currentPage = page ? parseInt(page as string, 10) : 1;

    return (
        <UserTable page={currentPage} title="User Data Management Table"/>
    )
}

export default UserDataTable
