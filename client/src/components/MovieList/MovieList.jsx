import React, { useState } from 'react'
import './MovieList.css'

function MovieList({ movieList = [], input = '' }) {
    const [showMore, setShowMore] = useState(10);
    //const phrases = ["5 stars", "at least", "after", "older then"]
    //const FilteredMovies = movieList.filter(movie=>Object.values(movie).includes(input));

    const handleShowMore = () => {
        setShowMore(showMore + 10);
    }

    const handleSearch = () => {
        return movieList.filter(movie => {
            const cast = movie.cast.toString().split(" ").join("");
            const votes = movie.vote_average.toString();
            if (input === "") {
                return movie
            } else if (movie.title.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return movie
            } else if (movie.release_date.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return movie
            } else if (movie.overview.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return movie
            } else if(cast.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return movie
            } else if(movie.cast.toString().substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return movie
            } 
        })
    }

    return (
        <>
            <div className='movie-list'>
                {handleSearch()
                    .sort((a, b) => b.vote_average - a.vote_average)
                    .slice(0, showMore)
                    .map((movie) => {
                        return (
                            <div key={movie.title}>
                                <img className="cover-img"
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt="movie"
                                />
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                                <p>Release:{movie.release_date}</p>
                                <p>Cast: {movie.cast.slice(0, 2)}</p>
                                <p>Rating: {movie.vote_average}</p>
                            </div>
                        )
                    })
                }
                <button onClick={handleShowMore}>Show More</button>
            </div>
        </>
    )
}

export default MovieList
