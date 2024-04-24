
import React, { useState, useCallback, useEffect } from 'react'
import './AdvancedSearchbar.css';
import './SearchComponent';
import debounce from 'lodash.debounce';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';






export default function AdvancedSearchbar({ onGenreSelect, setShowAdvancedSearch,fromYear, setFromYear  }) {

    const navigate = useNavigate();



    //const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');

   /* const handleFromYear = (event) => {
        setFromYear(event.target.value);
        console.log(event.target.value);
        //debouncedNavigate(event.target.value)
    };*/

    // new  
    const handleFromYear = (event) => {
    setFromYear(event.target.value);
};

    const handleToYear = (event) => {
        setToYear(event.target.value);
        console.log(event.target.value);
    };




    return (
        <div className='content'>
            <div className='sidebar_search'>
                <div className='row'>
                    <div className="col-lg-4 col-md-6">
                        <p>Time selection</p>
                        <input
                            type='text'
                            placeholder='from 1999'
                            id='fromInput'
                            className='timeInput'
                            value={fromYear}
                            onChange={handleFromYear} />
                        <input
                            type='text'
                            placeholder='to 2024'
                            id='toInput'
                            className='timeInput'
                            value={toYear}
                            onChange={handleToYear} />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <p>Genres</p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <p>sort</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
/*  <button onClick={applyFromYearFilter}>Apply Year Filter</button> */


/*
// test filtering
const applyFromYearFilter = () => {
    // Filter the movies before navigation
    const filteredMovies = movies.filter(movie => {
        const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
        return releaseYear ? releaseYear >= parseInt(fromYear, 10) : false;
    });

    // Navigate with the new fromYear parameter and pass along the filtered movies
    navigate(`/search?fromYear=${fromYear}`, { state: { results: filteredMovies } });
};*/