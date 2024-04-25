import React , { useState, useEffect } from 'react'
import './GroupPage.css'
import axios from 'axios'

export default function GroupPage() {

    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/groupMembers');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    console.log(members)

    return (
        <div className="group-page-container">
            <div className='group-page-header'>
                
                <div className='members-slider'>
                    <span className="material-symbols-outlined" id='member-button' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Group</span>
                </div>
            </div>

            <div className='container-lg'>
                <div className='group-content'>
                <div className='group-content-header'>
                        <img></img>
                        <h1>ElokuvaMättääjät</h1>
                    </div>
                    <div className='group-content-body'>
                        <p>Tervetuloa ryhmäämme! Täällä voit jakaa vapaasti arvosteluja elokuvista ja sarjoista.</p>
                    </div>
                    <div className='group-buttons'>
                        <button type="button" className="btn-movies">Movies</button>
                        <button type="button" className="btn-series">Series</button>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">Group Members</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul>
                     {
                        members.map(member => (
                            <li id='member-list' key={member.userId}>{member.username}</li>
                        ))
                     }
                    </ul>
                </div>
            </div>
        </div>
    )
}
