import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../movie/MovieDetail.css";
import YouTube from "react-youtube";
import axios from "axios";
import jwt_decode from "jwt-decode";

function MovieDetails() {
  let getTokenDetails = () => {
    let token = localStorage.getItem("auth-data");
    if (token === null) {
      return false;
    } else {
      return jwt_decode(token);
    }
  };

  let [userDetail, setUserDetail] = useState(getTokenDetails());

  let { id } = useParams();
  let [movieDetail, setMovieDetail] = useState([]);
  let [selectedMovie, setSelectedMovie] = useState({});

  const fetchMovies = async () => {
    let movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=cbe583074a04ba64db27bad20c95c928&language=en-US`
    );
    const videos = movie.data.results; //stored the movie details
    console.log(videos);
    let trailer = videos.find((vid) => vid.site === "YouTube");
    console.log(trailer.key);
    setSelectedMovie(trailer.key);
  };

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=cbe583074a04ba64db27bad20c95c928&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setMovieDetail(data));
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <main className="movie-datail-page container-fluid">
        {userDetail ? (
          <div className="movie-container row d-flex justify-content-center">
            <div className="col-lg-8 col-10  movie-detail-header">
              <div className="movie-detail-container">
                <h1 className="movie-title">{movieDetail.title}</h1>
                <h5>Release date: {movieDetail.release_date}</h5>
              </div>
              <div className="col-lg-4 col-12 movie-detail-rating ">
                <h5>
                  Rating: {movieDetail.vote_average}
                  <span>
                    <i className="fas fa-star text-warning"></i>
                  </span>
                </h5>
                <h5>
                  popularity:{movieDetail.popularity}
                  <span>
                    <i className="fas fa-heart text-danger"></i>
                  </span>
                </h5>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12 poster-container d-flex">
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  movieDetail.poster_path
                }
                alt="poster"
                className="movie-poster"
              />
              <div className="col-8 movie-trailer ">
                <YouTube
                  videoId={selectedMovie}
                  autoplay
                  className="trailer-video "
                />
              </div>
            </div>
            <div className="col-8 movie-detail-desc">
              <h5 className="fw-bold">Description:</h5>
              <div className="movie-overview">
                <h6>{movieDetail.overview}</h6>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100">
            <h1> Please Login to view this Page !!</h1>
          </div>
        )}
      </main>
    </>
  );
}

export default MovieDetails;
