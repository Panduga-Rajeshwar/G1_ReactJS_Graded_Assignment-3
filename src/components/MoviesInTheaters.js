import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MoviesInTheaters({ searchQuery }) {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/movies-in-theaters")
            .then((response) => setMovies(response.data))
            .catch((error) => console.error("Error fetching movies:", error));

        const savedFavorites = JSON.parse(localStorage.getItem("favourites")) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleFavouriteToggle = (movie) => {
        const isFavorite = favorites.some((fav) => fav.id === movie.id);
        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
        } else {
            updatedFavorites = [...favorites, movie];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
    };

    const filteredMovies = searchQuery
        ? movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : movies;

    return (
        <div className="movie-grid">
            {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={{ ...movie, endpoint: "http://localhost:3001/movies-in-theaters" }}
                        onFavouriteToggle={handleFavouriteToggle}
                        isFavorite={favorites.some((fav) => fav.id === movie.id)}
                    />
                ))
            ) : (
                <p>No movies found.</p>
            )}
        </div>
    );
}

export default MoviesInTheaters;
