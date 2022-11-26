import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "user-context/user-context";

export default function SignOut() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [user, userDispatch] = useUserContext();
  useEffect(() => {
    userDispatch.logout();
    window.sessionStorage.clear();
    navigate("/sign-in");
  }, []);
  return null;
}
