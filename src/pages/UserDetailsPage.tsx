import "@/App.css";

import { useParams, useNavigate } from "react-router";
import { GetUserById } from "@/core/api/user/actions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { EditUserForm } from "@/components";
const UserDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["users", { id }],
    queryFn: async () => GetUserById({ id: Number(id) }),
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page in history
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <h1>Welcome to your detail page</h1>
      <Button variant="default" onClick={handleGoBack} className=" bg-primary">
        Go back
      </Button>
      <EditUserForm setIsFormVisible={() => {}} userData={data} />
    </div>
  );
};

export default UserDetailsPage;
