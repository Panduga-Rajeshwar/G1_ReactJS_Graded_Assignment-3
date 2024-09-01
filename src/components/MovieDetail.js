import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = location.state?.endpoint || '';

  useEffect(() => {
    if (!endpoint) {
      setError("No endpoint provided.");
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${endpoint}/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details.");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, endpoint]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-detail">
      <img src={`/img/${movie.poster}`} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p><strong>Year:</strong> <span className="highlight">{movie.year}</span></p>
      <p><strong>Genres:</strong> {movie.genres.join(", ")}</p>
      <p><strong>Release Date:</strong> {movie.releaseDate}</p>
      <p><strong>Duration:</strong> {movie.duration} minutes</p>
      <p><strong>Content Rating:</strong> {movie.contentRating}</p>
      <p><strong>Storyline:</strong> {movie.storyline}</p>
      <p><strong>Actors:</strong> {movie.actors.join(", ")}</p>
      <p><strong>Average Rating:</strong> {movie.averageRating}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      <p><strong>Ratings:</strong> {movie.ratings.join(", ")}</p>
      <p><strong>Original Title:</strong> {movie.originalTitle}</p>
    </div>
  );
}

export default MovieDetail;
