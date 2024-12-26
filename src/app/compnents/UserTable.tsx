"use client";
import React, { ReactNode, useMemo, useState } from "react";
import { 
  LucideArrowLeft, 
  LucideArrowRight, 
  LucideChevronsDown, 
  LucideChevronsUp 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useUsers } from "../hooks/useUsers";

interface UserTableProps {
  page: number;
  title:string;
}

const UserTable: React.FC<UserTableProps> = ({ page,title }) => {
  const { data, isLoading, isError } = useUsers(page);
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
    ],
    []
  );

  // Create the table instance
  const table = useReactTable({
    data: data?.users || [],
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) 
    return <div className="flex justify-center items-center h-64"><p className="text-gray-600 text-lg">Loading...</p></div>;

  if (isError) 
    return <p className="text-red-500 text-center text-lg">Error loading data.</p>;

  const totalPages = Math.ceil((data?.total || 0) / 5);

  return totalPages < page ? (
    <p className="text-center text-gray-500 text-lg">Data Not Found</p>
  ) : (
    <div className="p-8 bg-white shadow-2xl rounded-lg">
      {/* Global Search Input */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-indigo-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-300">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-6 py-4 text-left text-sm font-medium text-indigo-800 cursor-pointer hover:bg-indigo-200"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {typeof header.column.columnDef.header === "function"
                          ? header.column.columnDef.header(header.getContext())
                          : header.column.columnDef.header}
                        {header.column.getIsSorted() === "asc" && (
                          <LucideChevronsUp size={18} className="ml-2 text-gray-600" />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <LucideChevronsDown size={18} className="ml-2 text-gray-600" />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="bg-white hover:bg-indigo-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-700 border-t border-gray-200"
                    >
                      {cell.renderValue() as ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6 text-gray-500">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Control */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => router.push(`/users?page=${page - 1}`)}
          disabled={page <= 1}
          className="flex items-center px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50"
        >
          <LucideArrowLeft size={20} />
          <span className="ml-2">Previous</span>
        </button>
        <span className="text-gray-700 font-medium">
          Page <strong>{page}</strong> of {totalPages}
        </span>
        <button
          onClick={() => router.push(`/users?page=${page + 1}`)}
          disabled={page >= totalPages}
          className="flex items-center px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50"
        >
          <span className="mr-2">Next</span>
          <LucideArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserTable;
