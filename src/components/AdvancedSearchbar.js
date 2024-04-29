import './AdvancedSearchbar.css';
import './SearchComponent';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';



export default function AdvancedSearchbar({ fromYear, setFromYear, toYear, setToYear, setSelectedGenreId  }) {

    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownToggleRef = useRef(null);

    const handleFromYear = (event) => {
        setFromYear(event.target.value);
        console.log(event.target.value);
    };

    const handleToYear = (event) => {
        setToYear(event.target.value);
        console.log(event.target.value);
    };


    const fetchGenres = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}search/genres/combined`);
            setGenres(response.data);
           // console.log(response.data);
        } catch (error) {
            console.error('Error fetching genres from backend', error);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const handleGenreSelection = (genreId) => {

        setSelectedGenreId(genreId);
        navigate('/search');
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
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                                onClick={toggleDropdown}
                                ref={dropdownToggleRef}
                            >
                                Select Genre
                            </button>
                            <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
                                {genres.map((genre) => (
                                    <a
                                        key={genre.id}
                                        className="dropdown-item"
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            console.log('Dropdown item clicked!', genre.name);
                                            handleGenreSelection(genre.id);
                                        }}>
                                        {genre.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <p>sort</p>
                    </div>
                </div>
            </div>
        </div>
    )
}