import React, { useState } from 'react'
import './MovieList.css'

function MovieList({ movieList = [], input = '' }) {
    const [showMore, setShowMore] = useState(10);

    const searchHandle = movieList.filter(movie => 
        Object.values(movie).some(val => typeof val === "string" && val.toLowerCase().includes(input.substr(2).toLowerCase()))
    );
    
    const handleShowMore = () => {
        setShowMore(showMore + 10);
    }

    return (
        <>
            <div className='movie-list'>
                {searchHandle.sort((a, b) => b.vote_average - a.vote_average)
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
                                <p>Average rate: {movie.vote_average}</p>
                                <div style={{display: "flex"}}>
                                <p>Cast: {movie.cast.slice(0, 2)} </p>
                                {movie.cast.length > 2 ? <p> + {movie.cast.length - 2} more</p> : null}
                                </div>
                            </div>
                        )
                    })
                }
                {showMore < movieList.length ? <button onClick={handleShowMore}>Show More</button>  : null }
            </div>
        </>
    )
}

export default MovieList
