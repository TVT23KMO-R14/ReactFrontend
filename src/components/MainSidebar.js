import React from 'react'
import './MainSidebar.css'
import { Link } from 'react-router-dom'

export default function MainSidebar() {
  return (
    <div className="sidebar">
      <Link to='/other'><a href="#">Top 100</a></Link>
      <a href="#">Dolor!</a>
      <a href="#">Architecto?</a>
      <a href="#">Sapiente.</a>
      <a href="#">Odit.</a>
      <a href="#">Recusandae!</a><a href="#">Repellat!</a>
      <a href="#">Architecto?</a><a href="#">Soluta.</a><a href="#">Assumenda!</a>
    </div>
  )
}
