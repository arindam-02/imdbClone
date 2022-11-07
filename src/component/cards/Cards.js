import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../cards/Cards.css";

const Cards = ({ movie }) => {
  let navigate = useNavigate();
  useEffect(() => {}, []);
  // console.log(movie);

  return (
    <>
      {
        <div
          className="cards"
          onClick={() => {
            navigate("/movie/" + movie.id);
          }}
        >
          <img
            src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
            alt=""
            className="cards_img"
          />

          <div className="cards-info">
            <h5 className="cards-title">{movie.title}</h5>
            <div className="cards-rating">{movie.release_date}</div>
            <div className="cards-desc">
              {movie.overview.slice(0, 100) + "...read more"}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Cards;
