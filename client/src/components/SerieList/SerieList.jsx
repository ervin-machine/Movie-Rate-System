import React, { useState } from 'react'
import './SerieList.css'

function SerieList({ serieList = [], input = '' }) {
    const [showMore, setShowMore] = useState(10);

    const handleShowMore = () => {
        setShowMore(showMore + 10);
    }

    const handleSearch = () => {
        return serieList.filter(serie => {
            const cast = serie.cast.toString().split(" ").join("")
            if (input === "") {
                return serie
            } else if (serie.name.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return serie
            } else if (serie.first_air_date.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return serie
            } else if (serie.overview.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return serie
            } else if(cast.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return serie
            } else if(serie.cast.toString().substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return serie
            } 
        })
    }
    
    return (
        <>
            <div className='serie-list'>
                {handleSearch()
                    .slice(0, showMore)
                    .sort((a, b) => b.rating - a.rating)
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
                                <p>Cast: {serie.cast}</p>
                                <p>Rating: {serie.vote_average}</p>
                            </div>
                        )
                    })
                }
                <button onClick={handleShowMore}>Show More</button>
            </div>
        </>
    )
}

export default SerieList
