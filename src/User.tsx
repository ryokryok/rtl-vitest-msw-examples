import { useState, useEffect, type FC } from "react";
import { fetchUser } from "./client";
import type { UserModel } from "./types";

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
export { fetchUser };

