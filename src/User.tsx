import { useState, useEffect, FC } from "react";

export type UserModel = {
  id: number;
  name: string;
  username: string;
};

export const fetchUser = async (userId: string): Promise<UserModel> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (response.ok || response.status === 200) {
    return response.json();
  } else {
    throw new Error("fetching error");
  }
};

export const User: FC<{ id: string }> = ({ id }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let ignore = false;

    const startFetching = async () => {
      setUser(null);
      try {
        const result = await fetchUser(id);
        if (!ignore) {
          setUser(result);
        }
      } catch {
        setError(true);
      }
    };
    startFetching();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (user === null && error) {
    return <p>Not Found</p>;
  }
  if (user === null) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <p style={{ fontWeight: "bold" }}>{user.name}</p>
      <p>{user.username}</p>
    </div>
  );
};
