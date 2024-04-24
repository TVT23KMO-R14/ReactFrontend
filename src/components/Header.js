
import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { useUser } from '../context/useUser';
import SearchComponent from './SearchComponent';
import Icon from './icon'

export default function Header({ onMovieSelect }) {


    return (
        <div className='header'>
           <SearchComponent onMovieSelect={onMovieSelect}/>
            <div className='title'>
                <Link to='/'><Icon /></Link>
            </div>
            <div className='login'>
                <li>
                    <Link to='/login'>Login <span className='material-symbols-outlined'>person</span></Link>
                </li>
            </div>
        </div>
    )
}


