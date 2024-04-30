
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser';
import './LoginStatus.css';


export default function LoginStatus() {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User state changed:", user);
    }, [user]);


    return (
        <div className='login'>
            {!user && <Link to='/login'>
                <div className='loginstatus'>
                    <span>Login</span><span className='material-symbols-outlined'>person</span>
                </div>
            </Link>}
            {user && <>
            <Link to='/userview'>
                <div className='loginstatus'>
                    <span>{user.username}</span><span className='material-symbols-outlined'>account_circle</span>
                </div>
            </Link>
            <Link to='/logout'>
                <div className='loginstatus'>
                    <span>Logout</span><span className='material-symbols-outlined'>logout</span>
                </div>
            </Link>
            </>
            }
        </div>
    )

    }

