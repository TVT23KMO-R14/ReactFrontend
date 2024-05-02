
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


export default function MovieCard({movie}) {

    if (!movie) return null;

    return (
        <div className='card' style={{ width: '25rem', display: 'flex', padding: '20px'}}>
            <img
                className='card-img-top'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title?movie.title: movie.name} poster`}
                style={{ width: '200px', height: 'auto' }} />
            <div className='card-body' style={{ flex: '1'}}>
                <h5 className='card-title'>{movie.title?movie.title: movie.name}</h5>
                <p className='card-text'>{movie.overview}</p>
                <p className='card-text'>{movie.release_date ? `Release Date: ${movie.release_date}`
                        : movie.first_air_date ? `First Air Date: ${movie.first_air_date}`
                            : 'Date Unknown'} </p>
            </div>
        </div>
    );
}
