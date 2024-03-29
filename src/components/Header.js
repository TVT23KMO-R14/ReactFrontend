import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className='header'>
        <div className='search'>
          <input type='text' placeholder='Search'></input>
          <span className='material-symbols-outlined'>
            <a href='#'>Search</a>
          </span>
        </div>
        <div className='title'>
          <h2>Front Page</h2>
        </div>
        <div className='login'>
          <a href='#'>Login</a>
          <span className='material-symbols-outlined'>person</span>
        </div>
    </div>
  )
}
