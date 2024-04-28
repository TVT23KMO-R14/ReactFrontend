import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function GroupMemberList() {

    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/groupMember/all');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    console.log(members)

    return (
        <>
            <ul>
                {
                    members.map(member => (
                        <li id='member-list' key={member.userId}>{member.role}</li>
                    ))
                }
            </ul>
        </>
    )
}
