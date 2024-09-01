import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, onFavouriteToggle, isFavorite, allowToggle }) {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`, { state: { endpoint: movie.endpoint } });
    };

    const handleFavouriteClick = (e) => {
        e.stopPropagation();
        if (!allowToggle && isFavorite) {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        } else {
            onFavouriteToggle(movie);
        }
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <img src={`/img/${movie.poster}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.releaseDate}</p>
            {allowToggle ? (
                <p className={`favourite ${isFavorite ? "red" : "grey"}`} onClick={handleFavouriteClick}>
                    {isFavorite ? "Remove from Favourites" : "Add to Favourites"} <span role="img" aria-label="heart">❤️</span>
                </p>
            ) : (
                <p className={`favourite disabled ${isFavorite ? "red" : "grey"}`} onClick={handleFavouriteClick}>
                    {isFavorite ? "Added to Favourites" : "Add to Favourites"} <span role="img" aria-label="heart">❤️</span>
                </p>
            )}
            {showPopup && <div className="popup">This movie is already in your favourites!</div>}
        </div>
    );
}

export default MovieCard;
