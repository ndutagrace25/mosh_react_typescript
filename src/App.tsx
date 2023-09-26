import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((item) => item.id !== user.id));

    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const updateUser = (id: number) => {
    setUsers(
      users.map((user) => {
        return {
          ...user,
          name: user.id === id ? "Changed" : user.name,
        };
      })
    );
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border text-success"></div>}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="mb-2 list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div className="">
              <button
                className="btn btn-outline-info btn-sm mx-3"
                onClick={() => updateUser(user.id)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
