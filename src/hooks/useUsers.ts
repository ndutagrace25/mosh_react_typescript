import { CanceledError } from "../services/api-client";
import userService, { User } from "../services/user-service";
import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const { cancel, request } = userService.getAll<User>();

    request
      .then((response) => {
        setLoading(false);
        setUsers(response.data);
      })
      .catch((error) => {
        setLoading(false);
        if (error instanceof CanceledError) return;
        setError(error.message);
      });

    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
