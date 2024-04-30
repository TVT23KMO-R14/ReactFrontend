import './AdvancedSearchbar.css';
import './SearchComponent';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from 'axios';



export default function AdvancedSearchbar({ fromYear, setFromYear, toYear, setToYear, setSelectedGenreId,sortOrder, setSortOrder }) {

    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);


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

    const toggleGenreDropdown = () => {
        setGenreDropdownOpen(!genreDropdownOpen); 
    };


    const handleGenreSelection = (genreId) => {

        setSelectedGenreId(genreId);
        navigate('/search');
    };

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!sortDropdownOpen);
    };

    const sortChange = (sortOrder) => {
        setSortOrder(sortOrder);
        console.log(sortOrder)
    }



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
                                id="genreDropdownButton"
                                aria-haspopup="true"
                                aria-expanded={genreDropdownOpen ? 'true' : 'false'}
                                onClick={toggleGenreDropdown}
                            >
                                Select Genre
                            </button>
                            <div className={`dropdown-menu${genreDropdownOpen ? ' show' : ''}`} aria-labelledby="genreDropdownButton">
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
                        <p>Sort</p>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="sortDropdownButton" 
                                aria-haspopup="true"
                                aria-expanded={sortDropdownOpen ? 'true' : 'false'} 
                                onClick={toggleSortDropdown} 
                            >
                                {sortOrder === 'none' ? 'No sorting selected' : sortOrder === 'ascending' ? 'Asc' : 'Des'}
                            </button>
                            <div className={`dropdown-menu${sortDropdownOpen ? ' show' : ''}`} aria-labelledby="sortDropdownButton"> 
                                <a
                                    className="dropdown-item"
                                    onClick={() => sortChange('none')}
                                >
                                    No sorting selected
                                </a>
                                <a
                                    className="dropdown-item"
                                    onClick={() => sortChange('ascending')}
                                >
                                    Asc
                                </a>
                                <a
                                    className="dropdown-item"
                                    onClick={() => sortChange('descending')}
                                >
                                    Des
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
}
