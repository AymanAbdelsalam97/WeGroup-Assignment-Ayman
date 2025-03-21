import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRole } from "@/types/User";

type TNavbarProps = {
  roles: string[] | TRole[];
  onSearch: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  setIsFormVisible: (isVisible: boolean) => void;
};
const Navbar = ({
  roles,
  onSearch,
  roleFilter,
  setRoleFilter,
  setIsFormVisible,
}: TNavbarProps) => {
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchInput(query);
    onSearch(query);
  };
  const handleFomVisibility = () => {
    setIsFormVisible(true);
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 m-4">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          className="pl-8 w-full"
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="h-9 w-[130px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" className="h-9 gap-1" onClick={handleFomVisibility}>
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
