import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Navbar({ searchQuery, setSearchQuery }) {
    return (
        <header>
            <nav>
                <div className="nav-links">
                    <NavLink exact to="/" activeClassName="active">Movies in theaters</NavLink>
                    <NavLink to="/coming-soon" activeClassName="active">Coming soon</NavLink>
                    <NavLink to="/top-rated-india" activeClassName="active">Top rated Indian</NavLink>
                    <NavLink to="/top-rated-movies" activeClassName="active">Top rated movies</NavLink>
                    <NavLink to="/favourites" activeClassName="active">Favourites</NavLink>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search movie"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="button" className="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
