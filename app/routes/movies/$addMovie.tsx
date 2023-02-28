import { LoaderArgs } from "@remix-run/node";
import getMovie from "~/api/getMovie";
import {insertMovie } from "~/api/databaseOperations.server";
import { requireUserId } from "~/session.server";
import { useLoaderData } from "react-router";
import { json } from "react-router";

export default function AddMovie() {

  const userMovies = useLoaderData();
  return (
    <>
      <h1>Movie Fetched Successfully</h1>
    </>
  );
}

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  const resp = await getMovie(params.addMovie!)
  const movie = resp.result
  console.log(movie.imdbID,movie.title,userId);
  
  insertMovie(movie.imdbID, movie.title, userId)
  
  return json({});
}