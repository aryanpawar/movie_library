import { Outlet } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { requireUserId } from "~/session.server";

export default function Movies() {
  return (
    <>
      <div className="container d-flex justify-content-center my-2">
        <h2 className="m-0">Welcome To MovieLibrary!</h2>
        <Form action="/logout" method="post">
          <button className="btn btn-danger mx-2" type="submit">
            Logout
          </button>
        </Form>
        <Link to={"/movies/usermovies"}>
          <button className="btn btn-info">Your Movies</button>
        </Link>
      </div>
      <div className="container d-flex justify-content-center text-center">
        <Form method="post" className="my-3 w-50" action="/movies/movieList">
          <input
            className="form-control my-3"
            type="text"
            name="mname"
            id="mname"
            placeholder="Enter Movie/Series Name"
          />
          <button type="submit" className="btn btn-info">
            {" "}
            Search{" "}
          </button>
        </Form>
      </div>
      <div className="container text-center">
        <Outlet />
      </div>
    </>
  );
}

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  return json({});
}
