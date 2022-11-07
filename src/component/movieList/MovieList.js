import "../movieList/MovieList.css";
import Cards from "../cards/Cards";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieList() {
  const API_key = "cbe583074a04ba64db27bad20c95c928";
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=${API_key}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setMovieList(data.results));
  };

  return (
    <>
      <div className="d-flex justify-content-center movie-list-container">
        <div className=" col-10 movie-list ">
          <h2 className="list-title text-warning">
            {(type ? type : "POPULAR").toUpperCase()}
          </h2>

          <div className="list-cards">
            {movieList.map((movie, index) => (
              <div key={index}>
                <Cards movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieList;
