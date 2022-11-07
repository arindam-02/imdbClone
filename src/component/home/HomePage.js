import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../home/HomePage.css";
import { useNavigate } from "react-router-dom";
import MovieList from "../movieList/MovieList";

function HomePage() {
  // const API_key = "cbe583074a04ba64db27bad20c95c928";

  let [popularMovies, setPopularMovies] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setPopularMovies(data.results));
  }, []);
  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          showIndicators={true}
          transitionTime={3}
        >
          {popularMovies.map((movie, index) => (
            <div
              key={index}
              onClick={() => {
                navigate("/movie/" + movie.id);
              }}
            >
              <div className="poster-image">
                <img
                  src={
                    "https://image.tmdb.org/t/p/original/" + movie.backdrop_path
                  }
                  alt="poster-img"
                />
              </div>
              <div className="poster-image-info">
                <div className="poster-title">{movie.title}</div>
                <div className="poster-release">
                  {movie.release_date}
                  <span className="poster-rating">
                    {movie.vote_average}
                    <i className="fas fa-star text-warning m-1"></i>
                  </span>
                </div>
                <div className="poster-desc">{movie.overview}</div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <MovieList />
    </>
  );
}

export default HomePage;
