export default async function getMovie(imdbId: String) {
  const res = await fetch(`http://localhost:5000/title/${imdbId}`);
  const movie = await res.json();
  return movie;
}
