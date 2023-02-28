import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { getUserMovies } from "~/api/databaseOperations.server";
import { requireUserId } from "~/session.server";

export default function UserMovies() {
  const userData = useLoaderData();
  const movies = userData.movies;
  console.log(movies);

  return (
    <>
      {
        movies.map(movie => {
          return <li key={movie.imdbID}>{movie.name}</li>
        })
      }
    </>
  );
}

export async function loader({request}) {
  const userId = await requireUserId(request);
  const userData = await getUserMovies(userId);
  return userData;
}