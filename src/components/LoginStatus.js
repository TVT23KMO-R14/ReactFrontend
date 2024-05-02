
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser';
import './LoginStatus.css';


export default function LoginStatus() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        console.log("User state changed:", user);
    }, [user]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600 && dropdownOpen) {
                setDropdownOpen(false);
            }
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const renderLinks = () => (
        <>
            <Link to='/browsegroups'>
                <div className='loginstatus'>
                    <span>Groups </span><span className='material-symbols-outlined'>groups</span>
                </div>
            </Link>
            <Link to='/browsereviews'>
                <div className='loginstatus'>
                    <span>Reviews </span><span className='material-symbols-outlined'>reviews</span>
                </div>
            </Link>
            {!user && <Link to='/login'>
                <div className='loginstatus'>
                    <span>Login </span><span className='material-symbols-outlined'>person</span>
                </div>
            </Link>}
            {user && <>
                <Link to='/userview'>
                    <div className='loginstatus'>
                        <span>{user.username} </span><span className='material-symbols-outlined'>account_circle</span>
                    </div>
                </Link>
                <Link to='/logout'>
                    <div className='loginstatus'>
                        <span>Logout </span><span className='material-symbols-outlined'>logout</span>
                    </div>
                </Link>
            </>}
        </>
    );
 

    return (
        <div className='login'>
            <button className="dropdown-button" onClick={toggleDropdown}>
                <span className='material-symbols-outlined'>menu</span>
            </button>
            <div className="header-links">
                {renderLinks()}
            </div>
            <div ref={dropdownRef} className={dropdownOpen ? 'dropdown-content show' : 'dropdown-content'}>
                {renderLinks()}
            </div>
        </div>
    )

}

