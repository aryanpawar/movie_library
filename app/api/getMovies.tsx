export default async function getMovies(mname: String) {
  const res = await fetch(`http://localhost:5000/search/title?title=${mname}`);
  const movies = await res.json();
  return movies;
}