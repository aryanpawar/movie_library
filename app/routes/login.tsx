import { ActionArgs, LoaderArgs, redirect, json } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/api/databaseOperations.server";

export async function action({request}: ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const user = await verifyLogin(username, password);

  if (!user) {
    console.log("\n\n Invalid Username Or Password! \n\n")
    throw Error("Invalid Username or Password");
  }

  return createUserSession({
    request,
    userId: user.username,
  })
}

export default function LoginPage() {
  return (
    <div className="container w-25 text-center my-3 border border-info">
      <Form method="post">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          className="form-control"
          id="username"
          required
          name="username"
          type="text"
        />

        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
        />

        <button className="btn btn-info my-2" type="submit">Log in</button>
      </Form>
      <Link to={"/register"}>
        <button className="btn btn-warning mb-2">Register</button>
      </Link>
    </div>
  );
}

export async function loader({request}: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect("/movies");
  return json({});
}