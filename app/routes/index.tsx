import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {

  const user = useOptionalUser();
  

  if (user) {
    return (
      <>
        <div className="container text-center">
          <h1>Welcome, {user.username}</h1>
          <Link to="/movies">
            <button className="btn btn-success">Find Movies!</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container text-center">
        <h1>Login First! 👀</h1>
        <Link to="/login">
          <button className="btn btn-info">
            Log In
          </button>
        </Link>
      </div>
    </>
  );
}
