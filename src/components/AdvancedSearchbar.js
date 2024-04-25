
import React from 'react'
import './AdvancedSearchbar.css';
import './SearchComponent';
import { useNavigate } from 'react-router-dom';



export default function AdvancedSearchbar({ fromYear, setFromYear, toYear, setToYear   }) {

    const navigate = useNavigate();


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