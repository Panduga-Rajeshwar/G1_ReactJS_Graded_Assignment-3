import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoviesInTheaters from "./components/MoviesInTheaters";
import MoviesComing from "./components/MoviesComing";
import TopRatedIndia from "./components/TopRatedIndia";
import TopRatedMovies from "./components/TopRatedMovies";
import Favourites from "./components/Favourites";
import Navbar from "./components/Navbar";
import MovieDetail from "./components/MovieDetail";
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<MoviesInTheaters searchQuery={searchQuery} />} />
          <Route path="/coming-soon" element={<MoviesComing searchQuery={searchQuery} />} />
          <Route path="/top-rated-india" element={<TopRatedIndia searchQuery={searchQuery} />} />
          <Route path="/top-rated-movies" element={<TopRatedMovies searchQuery={searchQuery} />} />
          <Route path="/favourites" element={<Favourites searchQuery={searchQuery} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
