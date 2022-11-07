import { Route, Routes } from "react-router-dom";
import Header from "./component/header/Header";
import HomePage from "./component/home/HomePage";
import MovieDetail from "./component/movie/MovieDetail";
import MovieList from "./component/movieList/MovieList";
import "../src/App.css";
import Footer from "./component/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies/:type" element={<MovieList />} />
        <Route path="/*" element={<h1>Error Page</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

// take 3 newOne final arindam 25-10-2022
