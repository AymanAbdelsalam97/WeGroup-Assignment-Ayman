import { useState } from "react";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TUser } from "@/types/User";

type TUsersViewProps = {
  users: TUser[];
  sortField: string;
  sortDirection: string;
  handleSort: (field: string) => void;
  handleEdit: (id: number, user: TUser) => void;
  handleDelete: (id: number) => void;
};
const columns = [
  { label: "User", field: "name" },
  { label: "Role", field: "role" },
];
export function UsersOverview({
  users,
  sortField,
  sortDirection,
  handleSort,
  handleDelete,
  handleEdit,
}: TUsersViewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  const actions = [
    { action: "view", text: "View user" },
    { action: "edit", text: "Edit user" },
    { action: "delete", text: "Delete user" },
  ];

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };
  const handleDeleteClick = (id: number) => {
    setUserIdToDelete(id);
    setIsDialogOpen(true);
  };
  const handleEditClick = (id: number) => {
    return handleEdit(id, users.find((user) => user.id === id) as TUser);
  };
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.field}
                    className={
                      column.field === "name"
                        ? "w-[250px] cursor-pointer"
                        : "cursor-pointer"
                    }
                    onClick={() => handleSort(column.field)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {getSortIcon(column.field)}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No users found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            {/* <Link href={`/users/${user.id}`} className="w-full">
                              View details
                            </Link> */}
                          </DropdownMenuItem>
                          {actions.map((action) => (
                            <DropdownMenuItem
                              key={action.text}
                              className={
                                action.action === "delete" ? "text-red-600" : ""
                              }
                              onClick={
                                action.action === "delete"
                                  ? () => handleDeleteClick(user.id)
                                  : action.action === "edit"
                                  ? () => handleEditClick(user.id)
                                  : () => {}
                              }
                            >
                              {action.text}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger />
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
                            <Button
                              variant="outline"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="bg-red-600 text-white"
                              onClick={() => {
                                if (userIdToDelete) {
                                  handleDelete(userIdToDelete);
                                }
                              }}
                            >
                              Confirm Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
