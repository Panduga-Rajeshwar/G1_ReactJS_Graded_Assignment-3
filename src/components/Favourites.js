import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function Favourites({ searchQuery }) {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(savedFavorites);
    }, []);

    const handleFavouriteToggle = (movie) => {
        const updatedFavorites = favourites.filter(fav => fav.id !== movie.id);
        localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
        setFavourites(updatedFavorites);
    };

    const filteredFavourites = searchQuery
        ? favourites.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : favourites;

    return (
        <div className="movie-grid">
            {filteredFavourites.length > 0 ? (
                filteredFavourites.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onFavouriteToggle={handleFavouriteToggle}
                        isFavorite={true}
                        allowToggle={true}
                    />
                ))
            ) : (
                <p>No favourites added yet.</p>
            )}
        </div>
    );
}

export default Favourites;
