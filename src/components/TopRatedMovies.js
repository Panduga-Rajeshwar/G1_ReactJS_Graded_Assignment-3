import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function TopRatedMovies({ searchQuery }) {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/top-rated-movies")
            .then(response => setMovies(response.data))
            .catch(error => console.error("Error fetching movies:", error));

        const savedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(savedFavorites);
    }, []);

    const handleFavouriteToggle = (movie) => {
        const isFavorite = favourites.some(fav => fav.id === movie.id);

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = favourites.filter(fav => fav.id !== movie.id);
        } else {
            updatedFavorites = [...favourites, movie];
        }

        localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
        setFavourites(updatedFavorites);
    };

    const filteredMovies = searchQuery
        ? movies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : movies;

    return (
        <div className="movie-grid">
            {filteredMovies.length > 0 ? (
                filteredMovies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={{ ...movie, endpoint: "http://localhost:3001/top-rated-movies" }}
                        onFavouriteToggle={handleFavouriteToggle}
                        isFavorite={favourites.some(fav => fav.id === movie.id)}
                    />
                ))
            ) : (
                <p>No movies found.</p>
            )}
        </div>
    );
}

export default TopRatedMovies;
