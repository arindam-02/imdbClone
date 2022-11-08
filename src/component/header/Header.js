import { useNavigate } from "react-router-dom";
import "../header/Header.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Header() {
  let navigate = useNavigate();
  let getTokenDetails = () => {
    let token = localStorage.getItem("auth-data");
    if (token === null) {
      return false;
    } else {
      return jwt_decode(token);
    }
  };

  let [userLogin, setUserLogin] = useState(getTokenDetails());

  const onSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    let token = credentialResponse.credential;
    localStorage.setItem("auth-data", token);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Welcome Back",
      showConfirmButton: true,
      timer: 1500,
    }).then(() => {
      window.location.reload(true);
    });
  };

  const onError = () => {
    alert("Login Failed");
  };
  let logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth-data");
        window.location.assign("/");
      }
    });
  };
  // let [query, setQuery] = useState("");
  // let searchMovies = (e) => {
  //   setQuery(e.target.value);
  // };
  // console.log(query);
  // const search = () => {};
  return (
    <GoogleOAuthProvider clientId="442977723110-8pdvnvr8ddobm5r88bli7f892es52gc9.apps.googleusercontent.com">
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Google Sign In
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body border border-danger d-flex justify-content-center p-5">
              <GoogleLogin onSuccess={onSuccess} onError={onError} />
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12 col-12 main-header d-flex justify-content-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/863px-IMDB_Logo_2016.svg.png"
          alt="logo"
          className="brand-logo pt-2"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="d-flex py-lg-2">
          <p
            className="mx-lg-5 mx-1 fw-bolder hand"
            onClick={() => {
              navigate("/movies/popular");
            }}
          >
            Popular
          </p>
          <p
            className="mx-lg-5 mx-1 fw-bolder hand"
            onClick={() => {
              navigate("/movies/top_rated");
            }}
          >
            Top Rated
          </p>
          <p
            className="mx-lg-5 mx-1 fw-bolder hand"
            onClick={() => {
              navigate("/movies/upcoming");
            }}
          >
            Upcoming
          </p>
          {/* <div className="search me-1">
            <span className=" input-group search-box px-2 d-flex align-items-center bg-light">
              <input
                type="text"
                name=""
                id=""
                placeholder="search movies"
                className=" p-1  form-control border border-0 me-4"
                // onChange={searchMovies}
                // value={query}

                // onClick={() => {
                //   navigate("/movie/" + movie.id);
                // }}
              />
              <i
                className="fa fa-search me-2"
                // onClick={() => {
                //   search;
                // }}
              ></i>
            </span>
          </div> */}
        </div>

        {userLogin ? (
          <div>
            <span className="text-warning me-4">
              Welcome, {userLogin.given_name}
            </span>
            <button
              className="btn btn-outline-warning fw-bold my-2"
              onClick={logout}
            >
              <i className="fas fa-power-off"></i> LogOut
            </button>
          </div>
        ) : (
          <div>
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn btn-outline-warning fw-bold my-2"
            >
              Hit me to Login
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Header;
