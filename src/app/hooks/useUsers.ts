import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async (page: number) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);

  const pageSize = 5;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    users: data.slice(start, end),
    total: data.length,
  };
};

export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
  });
};