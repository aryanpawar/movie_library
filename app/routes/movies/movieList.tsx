import { LoaderArgs, ActionArgs } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import getMovies from "~/api/getMovies";
import { requireUserId } from "~/session.server";
import { Link } from "@remix-run/react";

type Movie = {
  imdbID: string;
  title: string;
  poster: string;
  imdbRating: number;
};

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const searchMovie = formData.get("mname")?.toString() || "";
  const movies = await getMovies(searchMovie);

  return { movies, userId };
}

export default function MovieList() {
  const { movies, userId } = useActionData();
  console.log(movies.results);

  const movieList = movies.results;

  return (
    <>
      {movies.results.map((movie: Movie) => {
        return (
          <div key={movie.imdbID} className="container border">
            <div className="row">
              <div className="col-4">
                <img src={movie.poster} alt="" />
              </div>
              <div className="col-4">
                <h3>{movie.title}</h3>
                <h5>Rating {movie.imdbRating}</h5>
              </div>
              <div className="col-4 position-relative">
                <Link to={`/movies/${movie.imdbID}`}>
                  <button className="btn btn-warning position-absolute top-50 start-50 translate-middle">
                    Add To List
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
