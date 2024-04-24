
import React, { useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { useUser } from '../context/useUser';
import SearchComponent from './SearchComponent';
import LoginStatus from './LoginStatus';


export default function Header({ onMovieSelect }) {

    return (
        <div className='header'>
            <SearchComponent onMovieSelect={onMovieSelect} />
            <div className='title'>
                <Link to='/'>Movie Mayhem</Link>
            </div>
            <LoginStatus />
        </div>
    )
}


