
import React, { useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { useUser } from '../context/useUser';
import SearchComponent from './SearchComponent';
import LoginStatus from './LoginStatus';
import Icon from './icon'

export default function Header({ onMovieSelect }) {

    return (
        <div className='header'>
            <SearchComponent onMovieSelect={onMovieSelect} />
            <div className='title'>
                <Link to='/'><Icon /></Link>
            </div>
            <LoginStatus />
        </div>
    )
}


