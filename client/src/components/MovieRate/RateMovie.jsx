import React, { useState } from 'react'
import './RateMovie.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Rating from '@mui/material/Rating';
import Axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function RateMovie({ movieListRate = [], input = '' }) {
    const { getAccessTokenSilently } = useAuth0()
    const [rate, setRate] = useState(0);
    const [title, setTitle] = useState('')

    const handleSearch = () => {
        return movieListRate.filter(movie => {
            if (input === "") {
                return movie
            } else if (movie.title.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                return movie
            }
        })
    }

    const handleRate = () => {
        Axios.post("http://localhost:4000/rate-movie", {
            title: title,
            rate: rate
        })
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div>
                {handleSearch()
                    .sort((a, b) => b.vote_average - a.vote_average)
                    .map((movie) => {
                        return (
                            <div key={movie.title} onClick={() => setTitle(movie.title)}>
                                <Line options={options} data={{
                                    labels,
                                    datasets: [
                                        {
                                            label: movie.title,
                                            data: movie.votes,
                                            borderColor: 'rgb(255, 99, 132)',
                                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                        },
                                    ],
                                }}
                                />
                                <p className="movie-name">{movie.title}</p>
                                <Rating
                                    name={movie.title}
                                    value={movie.vote}
                                    onChange={(event, newValue) => {
                                        setRate(newValue);
                                    }}
                                    onClick={handleRate}
                                />
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default RateMovie
