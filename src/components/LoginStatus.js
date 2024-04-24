
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/useUser';
import './LoginStatus.css';

export default function LoginStatus() {
    const { user } = useUser()
    return (
        <div className='login'>
            {!user && <Link to='/login'>
                <div className='loginstatus'>
                    <span>Login</span><span className='material-symbols-outlined'>person</span>
                </div>
            </Link>}
            {user && <Link to='/logout'>
                <div className='loginstatus'>
                    <span>Logout</span><span className='material-symbols-outlined'>logout</span>
                </div>
            </Link>}
        </div>
    )
}


