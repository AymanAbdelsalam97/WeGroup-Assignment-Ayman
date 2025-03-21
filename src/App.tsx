import "@/App.css";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useMemo, useCallback } from "react";
import {
  AddUserForm,
  Footer,
  Navbar,
  EditUserForm,
  UsersOverview,
} from "./components";
import { TRole, TUser } from "./types/User";
import { GetAllUsers, DeleteUser } from "@/core/api/user/actions";

const App = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => GetAllUsers(),
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string | TRole>("All roles");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editData, setEditData] = useState<TUser | null>(null);

  useEffect(() => {
    const savedSortField = localStorage.getItem("sortField");
    const savedSortDirection = localStorage.getItem("sortDirection");

    if (savedSortField && savedSortDirection) {
      setSortField(savedSortField);
      setSortDirection(savedSortDirection as "asc" | "desc");
    }
  }, []);

  useEffect(() => {
    if (sortField && sortDirection) {
      localStorage.setItem("sortField", sortField);
      localStorage.setItem("sortDirection", sortDirection);
    }
  }, [sortField, sortDirection]);

  // normal gezien moet je vanaf react 19 geen usememo en useCallback meer gebruiken
  // normally speaking you should not use usememo and useCallback anymore from react 19
  const userData = useMemo(() => {
    return data ?? []; // Ensure userData is an empty array if data is null or undefined
  }, [data]) as TUser[];
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const deleteMutation = useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const roles = userData.reduce((acc, user) => {
    if (!acc.includes(user.role)) {
      acc.push(user.role);
    }
    return acc;
  }, [] as string[]);
  roles.unshift("All roles");

  const filteredUsers = userData.filter((user: TUser) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "All roles" ||
      user.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const fieldA = a[sortField as keyof typeof a];
    const fieldB = b[sortField as keyof typeof b];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }

    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const usersLength = sortedUsers.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(usersLength / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleEdit = (id: number, userData: TUser) => {
    setIsFormVisible(true);
    return setEditData(userData);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, usersLength);
  const usersToDisplay = sortedUsers.slice(startIndex, endIndex);

  return (
    <>
      {!isFormVisible && (
        <div className="p-10">
          <Navbar
            roles={roles}
            onSearch={handleSearch}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            setIsFormVisible={setIsFormVisible}
          />
          <UsersOverview
            users={usersToDisplay}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <Footer
            itemLength={usersLength}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            endIndex={endIndex}
          />
        </div>
      )}
      {isFormVisible && (
        <div className="w-full fixed top-25 left-0 bg-opacity-50 flex justify-center">
          <div className="w-2xl">
            {!editData ? (
              <AddUserForm setIsFormVisible={setIsFormVisible} />
            ) : (
              <EditUserForm
                setIsFormVisible={setIsFormVisible}
                userData={editData as TUser}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
