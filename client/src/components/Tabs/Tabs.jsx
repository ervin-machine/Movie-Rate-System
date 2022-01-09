import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import MovieList from '../MovieList/MovieList'
import SerieList from '../SerieList/SerieList';
import RateMovie from '../MovieRate/RateMovie';
import './Tabs.css'

function Tabs() {
    const { getAccessTokenSilently } = useAuth0()
    const [toggleState, setToggleState] = useState(1);
    const [movieList, setMovieList] = useState([]);
    const [serieList, setSerieList] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        getMovies();
        getSeries();
    })

    const getMovies = async () => {
        try {
            const token = await getAccessTokenSilently()
            const response = await Axios.get("http://localhost:4000/movies", {
              headers: {
                authorization: `Bearer ${token}`,
              }
            })
            setMovieList(response.data[0].results);
          } catch (error) {
            console.log(error.message)
          }
    }

    const getSeries = async () => {
        try {
            const token = await getAccessTokenSilently()
            const response = await Axios.get("http://localhost:4000/series", {
              headers: {
                authorization: `Bearer ${token}`,
              }
            })
            setSerieList(response.data[0].results);
          } catch (error) {
            console.log(error.message)
          }
    }

    const searchInput = (event) => {
        setInput(event.target.value);
    }

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="container">
            <input 
                className="search"
                type="text"
                placeholder="Type to search"
                onChange={searchInput}
            />
            <hr />
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Movie List
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    TV Shows
                </button>
                <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                >
                    Simple Movie List
                </button>
            </div>

            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                >
                    <MovieList movieList={movieList} input={input} />
                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >
                    <SerieList serieList={serieList} input={input} />
                </div>

                <div
                    className={toggleState === 3 ? "content  active-content" : "content"}
                >
                    <RateMovie movieListRate={movieList} input={input} />
                </div>

            </div>
        </div>
    )
}

export default Tabs
