import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@mui/material";
import { loginUser } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate(-1);
    }
  }, [isAuth]);

  if (isAuth) {
    return null;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        loginUser(username, password)
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);

            return navigate("/user", {
              replace: true,
            });
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage("Error while login.");
          });
      }}
    >
      <Input
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit">Log In</Button>

      {Boolean(errorMessage) && <p>{errorMessage}</p>}
    </form>
  );
};
