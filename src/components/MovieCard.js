
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


export default function MovieCard({movie}) {

    if (!movie) return null;

    return (
        <div className='card' style={{ width: '25rem', display: 'flex', padding: '20px'}}>
            <img
                className='card-img-top'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                style={{ width: '200px', height: 'auto' }} />
            <div className='card-body' style={{ flex: '1'}}>
                <h5 className='card-title'>{movie.title}</h5>
                <p className='card-text'>{movie.overview}</p>
            </div>
        </div>
    );
}
