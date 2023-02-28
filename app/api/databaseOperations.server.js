import db from "../models";

export async function verifyLogin(uname, pwd) {
  const user = await db.User.findOne({
    where: {
      username: uname,
      password: pwd,
    },
  });

  return user;
}

export async function getUserById(uname) {
  const user = await db.User.findOne({
    where: {
      username: uname,
    },
  });

  return user;
}

export async function movieExists(movieID) {
  const movie = await db.Movie.findOne({
    where: {
      imdbID: movieID,
    },
  });

  return movie;
}

export async function registerUser(uname, pwd) {
  const user = await db.User.create({ username: uname, password: pwd });
  return user;
}

export async function getUserMovies(uname) {
  const movies = await db.User.findOne({
    where: {
      username: uname,
    },
    include: [{ model: db.Movie }],
  });
  return movies;
}

export async function insertMovie(movieID, moviename, username) {
  console.log("Inside Add Movie");
  let movie = await movieExists(movieID);
  if (!movie) {
    movie = await db.Movie.create({ name: moviename, imdbID: movieID });
  }
  await junctionCreate(username, movieID);
  return movie;
}

export async function junctionCreate(username, moviename) {
  console.log("Inside Junction Create");
  const movie = await movieExists(moviename);
  const user = await db.User.findOne({ where: { username: username } })
  console.log(movie,user);
  await user.addMovie(movie);
}
