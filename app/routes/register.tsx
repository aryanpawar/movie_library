import { ActionArgs, LoaderArgs, redirect, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { registerUser } from "~/api/databaseOperations.server";
import { createUserSession, getUserId } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const user = await registerUser(username, password);

  if (!user) {
    console.log("\n\nSomething went wrong while adding user\n\n");
    return Error("Invalid Username or Password Error From action function");
  }

  return createUserSession({
    request,
    userId: user.username,
  });
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

        <button className="btn btn-info my-2" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/movies");
  return json({});
}
