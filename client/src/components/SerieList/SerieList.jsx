import React, { useState } from 'react'
import './SerieList.css'

function SerieList({ serieList = [], input = '' }) {
    const [showMore, setShowMore] = useState(10);
    const phrases = ["stars", "at least", "after", "older then"]

    const handleShowMore = () => {
        setShowMore(showMore + 10);
    }

    const searchHandle = serieList.filter(serie => 
        Object.values(serie).some(val => typeof val === "string" && val.toLowerCase().includes(input.substr(2).toLowerCase()))
    );
    
    return (
        <>
            <div className='serie-list'>
                {searchHandle
                    .slice(0, showMore)
                    .sort((a, b) => b.vote_average - a.vote_average)
                    .map((serie) => {
                        return (
                            <div key={serie.name}>
                                <img className="cover-img"
                                    src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                                    alt="serie"
                                />
                                <h3>{serie.name}</h3>
                                <p>{serie.overview}</p>
                                <p>Release:{serie.first_air_date}</p>
                                <p>Average rate: {serie.vote_average}</p>
                                <p>Cast: {serie.cast}</p>
                            </div>
                        )
                    })
                }
                {showMore < serieList.length ? <button onClick={handleShowMore}>Show More</button>  : null }
            </div>
        </>
    )
}

export default SerieList
