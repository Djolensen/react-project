import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAllUsers } from "../../api/api";
import { User as UserType } from "../../types/main";

type DecodedToken = {
  user: string;
};

export const User = () => {
  const [activeUser, setActiveUser] = useState<UserType>();

  useEffect(() => {
    getAllUsers().then((response) => {
      const users = response.data;
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const activeUser = users.find(
          (item) => item.username === decodedToken.user
        );

        setActiveUser(activeUser);
      }
    });
  }, []);

  return <div>{activeUser?.username}</div>;
};
